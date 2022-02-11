import axios, { AxiosResponse } from 'axios';
import User from "../models/users/User";
// axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.baseURL = 'https://cs5500-01-sp22.herokuapp.com/api';

const findAllUsers = async () =>
    await axios.get('/users');

const findUserById = async (uid: string) => 
    await axios.get(`/users/${uid}`);

const createUser = async (user: User) => {
    
}

// findUserById('61fe91c82902a4a7c81c4dd9')
//     .then(response => console.log(response.data));
findAllUsers()
    .then(response => console.log(response.data))