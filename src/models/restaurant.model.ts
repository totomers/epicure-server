import mongoose, { Schema } from "mongoose";
import IRestaurant from "../interfaces/restaurant.interface";

const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  chef: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },
  // dishes: { type: [mongoose.Schema.Types.ObjectId], ref: "Dishes" },
  isPopular: { type: Boolean, default: false },
});
// RestaurantSchema.post<IRestaurant>("save", function () {
//   this.extraInformation =
//     "This is a template usage of post schema method functions";
// });

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
