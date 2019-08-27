const admin = require('firebase-admin');
admin.initializeApp();

const functions = require('firebase-functions');

const inc1 = admin.firestore.FieldValue.increment(1);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.students = functions.https.onRequest(require('./students.app'));
exports.countEntrances = functions
    .firestore
    .document('students/{studentId}/entrances/{entranceId}')
    .onCreate(async (snapshot, context) => {
        const studentRef = admin.firestore().doc(`students/${context.params.studentId}`);

        await studentRef.update({ entranceCount: inc1 });
    });