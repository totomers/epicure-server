import { Document, ObjectId } from "mongoose";

export default interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
