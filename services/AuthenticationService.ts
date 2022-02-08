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


export const login = (username: string, password: string) => {
    userDao.findUserByCredentials(username, password)
        .then(user => {
            if(user) { return user;
            } else { throw "Unknown user" }
        })
        .then(user => console.log(user))
        .catch(e => console.log(e))
}

export const register = (username: string, password: string, email: string) => {
    userDao.findUserByUsername(username)
        .then(user => {
            if(user) {
                throw 'User already exists';
            } else {
                return userDao.createUser({
                    username, password, email
                });
            }
        })
        .then(newUser => console.log(newUser))
        .catch(e => console.log(e));
}

export const initializeSalaries = (salary: number) => {
    userDao.findAllUsers()
        .then(users => {
            const salaryPromises = users.map(user =>
                userDao.updateUserSalaryByUsername(user.username, salary));
            const resultPromise = Promise.all(salaryPromises);
            resultPromise
                .then(values => console.log(values))
        })
}

export const giveRaise = (raise: number) => {
    userDao.findAllUsers()
        .then(users => {
            const salaryPromises = users.map(user =>
            {
                // @ts-ignore
                const newSalary = user.salary * (1 + raise/100);
                return userDao.updateUserSalaryByUsername(
                    user.username,
                    newSalary)
            });
            const resultPromise = Promise.all(salaryPromises);
            resultPromise
                .then(values => console.log(values))
        })
}

giveRaise(50);

// initializeSalaries(50000);

// register('alice456', 'alice234', 'alice234@gmail.com')

// login('alice123', 'alice123')
// login('alice', 'alice123')

// userDao.findAllUsers()
//     .then(users => console.log(users));