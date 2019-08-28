import axios from 'axios';
import * as firebase from 'firebase/app';

export const studentsApi = axios.create({
    baseURL: process.env.REACT_APP_STUDENTS_API_BASE_URL
});

studentsApi.interceptors.request.use(async req => ({
    ...req,
    headers: {
        ...req.headers,
        Authorization: `Bearer ${await firebase.auth().currentUser.getIdToken()}`
    }
}));