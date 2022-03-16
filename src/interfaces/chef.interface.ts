import { Document, ObjectId } from "mongoose";

export default interface IChef extends Document {
  name: string;
  descr: string;
  url: string;
  isWeekly: boolean;
  //   restaurants: ObjectId[];
}

/**
 Restaurants collection
Name, image
Chef (ID object)
Dishes (array of ID objects)


Dishes collection
Name ,price 
Ingredients,tags
Restaurant (ID object)

 */
