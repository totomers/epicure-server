import IDish from "../interfaces/dish.interface";
import IHandlerResults from "../interfaces/handlerResults.interface";
import Dish from "../models/dish.model";

export const getAllDishesDb = async (): Promise<IHandlerResults> => {
  try {
    const dishes = await Dish.find().populate("restaurant").exec();
    return { success: dishes };
  } catch (error) {
    return { error };
  }
};
export const getDishesOfRestaurantDb = async (
  _id: string
): Promise<IHandlerResults> => {
  try {
    const dishes = await Dish.find({ restaurant: _id });
    return { success: dishes };
  } catch (error) {
    return { error };
  }
};
export const getDishDb = async (_id: string): Promise<IHandlerResults> => {
  try {
    const dish = await Dish.findById(_id);
    return { success: dish };
  } catch (error) {
    return { error };
  }
};
export const createDishDb = async (
  props: Partial<IDish>
): Promise<IHandlerResults> => {
  try {
    const newDish = new Dish(props);
    const dish = await newDish.save();
    return { success: dish };
  } catch (error) {
    return { error };
  }
};

export const updateDishDb = async (
  props: Partial<IDish>
): Promise<IHandlerResults> => {
  const { name, url, price, tags, ingredients, restaurant, _id } = props;
  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      _id,
      { name, url, price, tags, ingredients, restaurant },
      { new: true }
    );
    return { success: updatedDish };
  } catch (error) {
    return { error };
  }
};

export const deleteDishDb = async (_id: string): Promise<IHandlerResults> => {
  try {
    const deleted = await Dish.findByIdAndDelete(_id);
    return { success: deleted._id ? true : false };
  } catch (error) {
    return { error };
  }
};
