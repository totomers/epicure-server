import mongoose, { Schema } from "mongoose";
import IDish from "../interfaces/dish.interface";

const DishSchema: Schema = new Schema({
  name: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  price: { type: Number, default: 0 },
  url: { type: String },
  ingredients: { type: String },
  tags: { type: [String] },
});

export default mongoose.model<IDish>("Dish", DishSchema);
