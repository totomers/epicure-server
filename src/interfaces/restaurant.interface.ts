import { Document, ObjectId } from "mongoose";

export default interface IRestaurant extends Document {
  name: string;
  url: string;
  chef: ObjectId;
  //   dishes: ObjectId[];
  signatureDish: ObjectId;
  isPopular: boolean;
}

/**
 * 
 *  Restaurants collection
Name, image
Chef (ID object)
Dishes (array of ID objects)

 */
