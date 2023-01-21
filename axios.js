import axios from 'axios';
import { BASEURL } from './constants';

export default axios.create({
    baseURL: BASEURL
});

export const axiosPrivate = axios.create({
    baseURL: BASEURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});