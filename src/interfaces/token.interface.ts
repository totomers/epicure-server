import { Document, ObjectId } from "mongoose";

export default interface IToken extends Document {
  userId: ObjectId;
  token: string;
  expiredAt: Date;
}
