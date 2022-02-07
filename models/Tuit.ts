import User from "./User";
export default class Tuit {
private tuit: string = '';
private postedOn?: Date;
private postedBy: User | null = null;
}