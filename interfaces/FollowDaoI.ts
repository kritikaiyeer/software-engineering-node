import Follow from "../models/Follow";

/**
 * @file Declares API for Follow related data access object methods
 */
export default interface FollowDaoI {
    findAllUsersThatFollowUser (uid: string): Promise<Follow[]>;
    findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
    userUnfollowsUser (uid: string, uidFollowing: string): Promise<any>;
    userFollowsUser (uid: string, uidFollowing: string): Promise<Follow>;
};