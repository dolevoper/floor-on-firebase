const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const bearerToken = require('express-bearer-token');

const app = express();
const studentsCollection = admin.firestore().collection('students');

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(bearerToken());
app.use(async ({ token }, res, next) => {
    if (!token) {
        console.log('not token');
        res.status(401);
        res.send('unauthorized');

        return;
    }

    try {
        await admin.auth().verifyIdToken(token);
    } catch (err) {
        console.log('invalid token');
        res.status(401);
        res.send('unauthorized');

        return;
    }

    next();
});

app.get('/api/students', async (_, res, next) => {
    try {
        const students = await studentsCollection.get();

        res.status(200);
        res.json(students.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })));
    } catch (err) {
        next(err);
    }
});

app.post('/api/students', async (req, res, next) => {
    try {
        const studentRef = await studentsCollection.add(req.body);
        const student = {
            ...req.body,
            id: studentRef.id
        };

        res.status(201);
        res.json(student);
    } catch (err) {
        next(err);
    }
});

app.post('/api/students/:id/entrance', async (req, res, next) => {
    try {
        const entranceData = {
            ...req.body,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const entranceRef = await studentsCollection.doc(req.params.id).collection('entrances').add(entranceData);
        const entrance = {
            ...req.body,
            createdAt: new Date(),
            id: entranceRef.id
        };

        res.status(201);
        res.json(entrance);
    } catch (err) {
        next(err);
    }
});

module.exports = app;