import mongoose, { Schema } from "mongoose";
import IToken from "../interfaces/token.interface";

const TokenSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    token: { type: String },
    expiredAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IToken>("Token", TokenSchema);
