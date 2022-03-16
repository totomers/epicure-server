import mongoose, { Schema } from "mongoose";
import IChef from "../interfaces/chef.interface";

const ChefSchema: Schema = new Schema({
  name: { type: String, required: true },
  descr: { type: String },
  url: { type: String },
  isWeekly: { type: Boolean, default: false },
  // restaurants: { type: [mongoose.Schema.Types.ObjectId], ref: "Restaurant" },
});

export default mongoose.model<IChef>("Chef", ChefSchema);
