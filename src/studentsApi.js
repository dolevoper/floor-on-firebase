import axios from 'axios';

export const studentsApi = axios.create({
    baseURL: process.env.REACT_APP_STUDENTS_API_BASE_URL
});