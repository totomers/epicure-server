import IChef from "../interfaces/chef.interface";
import IDish from "../interfaces/dish.interface";
import IRestaurant from "../interfaces/restaurant.interface";
import Chef from "../models/chef.model";
import Dish from "../models/dish.model";
import Restaurant from "../models/restaurant.model";

export const getAllContentDb = async (name: string) => {
  try {
    const restaurants = await Restaurant.find({
      name: { $regex: name, $options: "i" },
    }).select({ name: 1, _id: 1, url: 1 });
    const dishes = await Dish.find({
      name: { $regex: name, $options: "i" },
    }).select({ name: 1, _id: 1, url: 1 });
    const chefs = await Chef.find({
      name: { $regex: name, $options: "i" },
    }).select({ name: 1, _id: 1, url: 1 });

    const filteredResults = [{ restaurants }, { dishes }, { chefs }].reduce(
      (prev, cur, index) => {
        console.log("cur", cur);

        const objectArr = Object.entries(cur);
        const [key, value] = objectArr[0];
        // console.log("onject array:", objectArr);

        // console.log(" value", value);
        // console.log(" key", key);
        //@ts-ignore
        if (value.length > 0) prev[`${key}`] = value;
        // console.log("prev.key", prev);

        return prev;
      },
      {}
    );
    console.log(filteredResults);

    return {
      success: filteredResults as {
        restaurants?: IRestaurant[];
        dishes?: IDish[];
        chefs?: IChef[];
      },
    };
  } catch (error) {
    return { error };
  }
};

export const countAllDocumentsDb = async (name: string) => {
  try {
    const restaurants = await Restaurant.countDocuments();
    const dishes = await Dish.countDocuments();
    const chefs = await Chef.countDocuments();

    return {
      success: { restaurants, dishes, chefs },
    };
  } catch (error) {
    return { error };
  }
};
