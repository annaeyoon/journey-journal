//import mysql from 'mysql2';

function getUsername() {
    const usernameContent = document.getElementById("login").value;
    console.log(usernameContent);
    //const userid = connectToDB(usernameContent);
    //sessionStorage.set('userid', userid);
    sessionStorage.setItem('username', usernameContent);
    window.location.href = '/index.html';

    return usernameContent;
}

document.getElementById("buttonID").addEventListener("click", getUsername);


// function connectToDB(username) {
//     const db = mysql.createConnection({
//         host: 'database-irvine.cn2ymqgeihdj.us-east-1.rds.amazonaws.com',
//         user: 'admin',        // your MySQL username
//         password: 'adminpw!', // your MySQL password
//         database: 'irvinedb'        // your database name
//     });

//     db.connect(err => {
//         if (err) {
//         console.log('Error connecting to the database:', err);
//         return;
//         }
//         console.log('Connected to the MySQL database');
//     });

//     db.query('SELECT user_id FROM users WHERE username = ?', [username], (err, results) => {
//         if (err) {
//             console.log('Error executing SELECT query:', err);
//             return;
//         }

//         // If the user exists, return the user_id
//         if (results.length > 0) {
//             console.log('User ID:', results[0].user_id);
//             return user_id;
//         } else {
//             // If the user does not exist, insert the username
//             db.query('INSERT INTO users (username) VALUES (?)', [username], (err, insertResults) => {
//                 if (err) {
//                     console.log('Error executing INSERT query:', err);
//                     return;
//                 }
//                 // Return the newly created user_id
//                 console.log('User inserted. New User ID:', insertResults.insertId);
//                 return insertResults.insertId;
//             });
//         }
//     });

//     // Close the database connection
//     db.end(err => {
//         if (err) {
//             console.error('Error closing the database connection:', err);
//             return;
//         }
//         console.log('Database connection closed');
//     });

// }

