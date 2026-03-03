// import conn from '../db.js';
import statusCode from 'http-status-codes';
import mariadb from "mysql2/promise";

// 주문 하기
export const order = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'root',
        database: 'mydb',
        dateStrings: true
    });

    const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

    // delivery 테이블 삽입
    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];

    let [results] = await conn.execute(sql, values);
    let delivery_id = results.insertId;

    // orders 테이블 삽입
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
            VALUES (?, ?, ?, ?, ?);`
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    [results] = await conn.execute(sql, values);
    let order_id = results.insertId;

    // items를 가지고 장바구니에서 book_id, quantity 조회
    sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
    let [orderItems, fields] = await conn.query(sql, [items]);

    // orderedBook 테이블 삽입
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

    const orderedBookValues = orderItems.map(item => [
        order_id,
        item.book_id,
        item.quantity
    ]);

    results = await conn.query(sql, [orderedBookValues]);
    let result = await deleteCartItems(conn, items);
    return res.status(statusCode.CREATED).json(results[0]);
};

// 장바구니 아이템 삭제
export const deleteCartItems = async (conn, items) => {
    let sql  = `DELETE FROM cartItems WHERE id IN (?)`;
    const result = await conn.query(sql, [items]);
    return result;
}

// 주문 목록 조회
export const gerOrders = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'root',
        database: 'mydb',
        dateStrings: true
    });
    const sql = `SELECT orders.id, book_title, total_quantity, total_price, address, receiver, contact, created_at
FROM orders LEFT JOIN delivery
ON orders.delivery_id = delivery.id`
    let [rows, fields] = await conn.query(sql);
    return res.status(statusCode.OK).json(rows);
};

// 주문 상세 상품 조회
export const getOrderDetail = async (req, res) => {
    const { id } = req.params;
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'root',
        database: 'mydb',
        dateStrings: true
    });
    const sql = `SELECT book_id, title, author, price, quantity
FROM orderedBook LEFT JOIN books
ON orderedBook.book_id = books.id
WHERE order_id = ?`
    let [rows, fields] = await conn.query(sql, [id]);
    return res.status(statusCode.OK).json(rows);
};
