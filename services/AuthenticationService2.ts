import User from "../models/users/User";
import UserDao from "../daos/UserDao";
import mongoose from "mongoose";
const userDao: UserDao = UserDao.getInstance();

const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.m8jeh.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString);


export const login = async (username: string, password: string) => {
    
    try {
        const user = await userDao.findUserByCredentials(username, password);
        if(!user) {
            throw "Unknown user";
        }
        console.log(user);
    } catch (e) {
        console.log(e);
    }
}

export const register = async (username: string, password: string, email: string) => {
    
    try {
        const user = await userDao.findUserByUsername(username);
        if (user) {
            throw 'User already exists';
        }
        const newUser = await userDao.createUser({username, password, email});
        console.log(newUser);
    } catch (e) {
        console.log(e);
    }
}

export const initializeSalaries = async (salary: number) => {
    const users = await userDao.findAllUsers()
    const salaryPromises = users.map(user =>
        userDao.updateUserSalaryByUsername(user.username, salary));
    const values = await Promise.all(salaryPromises);
    console.log(values);
}



// register('alice678', 'alice234', 'alice234@gmail.com')

login('alice678', 'alice234')
// login('alice', 'alice123')

// userDao.findAllUsers()
//     .then(users => console.log(users));