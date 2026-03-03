import mariadb from 'mysql2/promise';

// connection 생성
const connection = async () => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'root',
        database: 'mydb',
        dateStrings: true
    });
return conn;
}

export default connection;
