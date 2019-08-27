const express = require('express');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/api/students', (_, res) => {
    res.status(200);
    res.json([]);
});

app.post('/api/students', (req, res) => {
    const student = {
        ...req.body,
        id: uuid.v4()
    };

    res.status(201);
    res.json(student);
});

app.post('/api/students/:id/entrance', (req, res) => {
    const entrance = {
        ...req.body,
        createdAt: new Date()
    };

    res.status(201);
    res.json(entrance);
});

module.exports = app;