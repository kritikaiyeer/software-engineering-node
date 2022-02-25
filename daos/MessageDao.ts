/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";
/**
 * Implements Data Access Object managing data storage
 * of Messages
 * @implements {MessageDaoI} MessageDaoI
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    /**
      * Retrieves all messages sent by a user
      * @param {String} uid uid representing user
      */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid})
    /**
      * Retrieves all messages sent to user 
      * @param {Request} uid user id
      */
    findAllMessagesSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid})
    /** 
      * @param {String} uidFrom user id sending message
      * @param {String} uidTo user id receiving message
      * @param {String} message message
    */
    userSendsMessage = async (uidFrom: string, uidTo: string,message: Message): Promise<any> =>
        MessageModel.create({...message,from: uidFrom, to: uidTo});
    /**
      * @param {String} _id message id
      * @param {String} from user id
      */
    userUnsendsMessage = async (_id: string, from: string): Promise<any> =>
        MessageModel.deleteOne({_id: _id, from: from});
}