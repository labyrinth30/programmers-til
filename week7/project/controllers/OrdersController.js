import conn from '../db.js';
import statusCode from 'http-status-codes';

// 주문 하기
export const order = (req, res) => {
    const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

    let delivery_id=3;
    let order_id=2;

    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    conn.query(sql, values, (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        delivery_id = results.insertId;
        return res.status(statusCode.CREATED).json(results);
    });
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
            VALUES (?, ?, ?, ?, ?);`
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    conn.query(sql, values, (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        order_id = results.insertId;
        return res.status(statusCode.CREATED).json(results);
    });
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
    values = [];
    items.forEach((item) =>
        values.push([order_id, item.book_id, item.quantity])
    );
    conn.query(sql, [values], (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        order_id = results.insertId;
        return res.status(statusCode.CREATED).json(results);
    });
};

// 주문 목록 조회
export const gerOrders = (req, res) => {

};

// 주문 상세 상품 조회
export const getOrderDetail = (req, res) => {

};
