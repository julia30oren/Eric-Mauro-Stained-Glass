const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const dbService = require("./db_service");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Create
app.post('/insert', (req, res) => {
    const { url, title, description, date } = req.body;
    const db = dbService.getDbServiceInstance();

    if (url) {
        const result = db.addNewImage(url, title, description, date);

        result
            .then(data => res.json({ data: data }))
            .catch(err => console.log(err));
    }

});

// Reed
app.get('/getall', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// Update
app.patch('/update', (req, res) => {
    const { id, name } = req.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateById(id, name);

    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err));
});

// Delete
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteImageById(id);

    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err));
});

app.listen(process.env.PORT, (err) => { err ? console.log(err) : console.log('Port: ', process.env.PORT) });