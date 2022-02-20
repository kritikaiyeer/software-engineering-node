import Message from "../models/Message";

/**
 * @file Declares API for Message related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesSentByUser (from: string): Promise<Message[]>;
    findAllMessagesSentToUser (to: string): Promise<Message[]>;
    userUnsendsMessage (from: string, to: string): Promise<any>;
    userSendsMessage (from: string, to: string, message: Message): Promise<Message>;
};