import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user.interface";

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  token: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
