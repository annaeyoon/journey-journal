
function getUsername() {
    const usernameContent = document.getElementById("login").value;
    console.log(usernameContent);
    return usernameContent;
}

document.getElementById("buttonID").addEventListener("click", getUsername);

import express from 'express';
import mysql from 'mysql2';


function connectToDB() {
    const db = mysql.createConnection({
        host: 'database-irvine.cn2ymqgeihdj.us-east-1.rds.amazonaws.com',
        user: 'admin',        // your MySQL username
        password: 'adminpw!', // your MySQL password
        database: 'irvinedb'        // your database name
    });

    db.connect(err => {
        if (err) {
        console.log('Error connecting to the database:', err);
        return;
        }
        console.log('Connected to the MySQL database');
    });

    db.query


}

