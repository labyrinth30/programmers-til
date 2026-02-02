import db from 'mysql2';

const connection = db.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'user',
    password: 'root',
    database: 'mydb',
    dateStrings: true,
    timezone: '+09:00'
})

// connection.query(
//     'SELECT * FROM users',
//     (err, results, fields) => {
//         const { id, email, name, created_at  } = results[0];
//         console.log(name);
//         console.log(created_at);
//     }
// )

export default connection;
