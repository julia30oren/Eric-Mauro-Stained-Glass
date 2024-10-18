const mysql = require("mysql2");
require("dotenv").config();
var DB_state = '';

let instance = null;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
});

function logState() {
    console.log(DB_state);
}

function addAdmins() {
    const query = `INSERT INTO admins (admin_name,admin_password) VALUES (?,?)`;

    connection.query(query, [process.env.ADMINNAME, process.env.ADMINPASS], (err, result) => {
        if (err) console.log(err);
        else {
            DB_state = `Admin "${process.env.ADMINNAME}" was created.`;
            logState();
        }
    })
}

function createImageTable() {
    connection.query(`CREATE TABLE ${process.env.TABLE} (
                id BIGINT NOT NULL AUTO_INCREMENT,
                url VARCHAR(2048) NULL,
                title VARCHAR(2048) NULL,
                description VARCHAR(4096) NULL,
                createdAt DATETIME NULL,
                PRIMARY KEY (`+ 'id' + `)
                )ENGINE = InnoDB`,

        (err, result) => {
            if (err) console.log(err);
            else {
                DB_state = `TABLE for ${process.env.TABLE} was created.`;
                logState();
            }
        });
}

function createAdminTable() {
    connection.query(`CREATE TABLE ${process.env.ADMINTABLE} (
                id BIGINT NOT NULL AUTO_INCREMENT,
                admin_name VARCHAR(2048) NOT NULL,
                admin_password VARCHAR(2048) NOT NULL,
                PRIMARY KEY (`+ 'id' + `)
                )ENGINE = InnoDB`,

        (err, result) => {
            if (err) console.log(err);
            else {
                DB_state = `TABLE for ${process.env.ADMINTABLE} was created.`;
                logState();
                addAdmins();
            }
        });
}

function ifTablesEXIST() {
    DB_state = "Database " + process.env.DATABASE + ' connected.';
    logState();

    connection.query(`SHOW TABLES LIKE '${process.env.TABLE}'`, (err, res) => {
        if (err) throw err;
        else if (!res[0]) createImageTable();
        else { DB_state = `TABLE for ${process.env.TABLE} exist.`; logState(); }
    });

    connection.query(`SHOW TABLES LIKE '${process.env.ADMINTABLE}'`, (err, res) => {
        if (err) throw err;
        else if (!res[0]) createAdminTable();
        else { DB_state = `TABLE for ${process.env.ADMINTABLE} exist.`; logState(); }
    });
}

function createDatabase() {
    connection.query(`CREATE DATABASE ${process.env.DATABASE}`, (err, res) => {
        if (err) throw err;
        else {
            DB_state = `Database ${process.env.DATABASE} was created.`;
            ifDatabaseEXIST();
            createImageTable();
            createAdminTable();
        }
    });
}

function ifDatabaseEXIST() {
    connection.query(`USE ${process.env.DATABASE}`, (err, res) => err ? createDatabase() : ifTablesEXIST());
}

connection.connect((err) => err ? console.log(err.message) : ifDatabaseEXIST());


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async ifAdmin(x, y) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM admins WHERE admin_name = ? AND admin_password = ?";

                connection.query(query, [x, y], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;

        } catch (err) { console.log(err) }
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const get_all_query = `SELECT * FROM images ORDER BY createdAt DESC`;

                connection.query(get_all_query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;

        } catch (err) { console.log(err) }
    }

    async addNewImage(url, title, description, date) {
        try {
            const createdAt = date ? date : new Date();
            const new_image = [url, title, description, createdAt];

            const insertId = await new Promise((resolve, reject) => {
                const add_new_query = "INSERT INTO images (url,title,description,createdAt) VALUES (?,?,?,?);";

                connection.query(add_new_query, new_image, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });

            return {
                id: insertId,
                url: url,
                title: title,
                description: description,
                createdAt: createdAt
            };
        } catch (err) { console.log(err) }
    }

    async deleteImageById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM images WHERE id = ?";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateById(id, title, description, date) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE images SET title = ?,description = ?, createdAt = ? WHERE id = ?";

                connection.query(query, [title, description, date, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;