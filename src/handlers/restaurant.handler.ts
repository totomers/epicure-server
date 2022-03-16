import IHandlerResults from "../interfaces/handlerResults.interface";
import IRestaurant from "../interfaces/restaurant.interface";
import Restaurant from "../models/restaurant.model";

export const getAllRestaurantsDb = async (): Promise<IHandlerResults> => {
  try {
    const restaurants = await Restaurant.find();
    return { success: restaurants };
  } catch (error) {
    return { error };
  }
};

export const getPopularRestaurantsDb = async (): Promise<IHandlerResults> => {
  try {
    const restaurants = await Restaurant.find({ isPopular: true })
      .populate("chef")
      .exec();
    return { success: restaurants };
  } catch (error) {
    return { error };
  }
};

export const getRestaurantsOfChefDb = async (
  _id: string
): Promise<IHandlerResults> => {
  try {
    const restaurants = await Restaurant.find({ chef: _id });
    return { success: restaurants };
  } catch (error) {
    return { error };
  }
};

export const createRestaurantDb = async (
  props: Partial<IRestaurant>
): Promise<IHandlerResults> => {
  try {
    const newRestaurant = new Restaurant(props);
    const restaurant = await newRestaurant.save();
    return { success: restaurant };
  } catch (error) {
    return { error };
  }
};

export const updateRestaurantDb = async (
  props: Partial<IRestaurant>
): Promise<IHandlerResults> => {
  try {
    const { name, url, chef, isPopular, _id } = props;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      _id,
      { name, url, chef, isPopular },
      {
        new: true,
      }
    );
    return { success: updatedRestaurant };
  } catch (error) {
    return { error };
  }
};

export const deleteRestaurantDb = async (
  _id: string
): Promise<IHandlerResults> => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(_id);
    return { success: deleted._id ? true : false };
  } catch (error) {
    return { error };
  }
};
