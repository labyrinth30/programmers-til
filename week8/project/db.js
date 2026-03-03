import mariadb from 'mysql2';

// connection 생성
const connection = mariadb.createPool({
        host: 'localhost',
        user: 'user',
        password: 'root',
        database: 'mydb',
        dateStrings: true
});

export default connection;
