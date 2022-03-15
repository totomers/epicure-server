import { Document, ObjectId } from "mongoose";

export default interface IDish extends Document {
  name: string;
  price: number;
  url: string;
  ingredients: string;
  restaurant: ObjectId;
  tags: string[];
}

/*

Name ,price 
Ingredients,tags
Restaurant (ID object)
*/
