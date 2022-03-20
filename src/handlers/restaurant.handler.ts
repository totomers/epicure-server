import IHandlerResults from "../interfaces/handlerResults.interface";
import IRestaurant from "../interfaces/restaurant.interface";
import Restaurant from "../models/restaurant.model";
import Dish from "../models/dish.model";
import conn from "../DB/mongoDB";
export const getAllRestaurantsDb = async (): Promise<IHandlerResults> => {
  try {
    const restaurants = await Restaurant.find().populate("chef").exec();
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
    console.log(error);

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

export const getRestaurantDb = async (
  _id: string
): Promise<IHandlerResults> => {
  try {
    const restaurant = await Restaurant.findById(_id);
    return { success: restaurant };
  } catch (error) {
    return { error };
  }
};

export const getRestaurantsSignatureDishesDb =
  async (): Promise<IHandlerResults> => {
    try {
      const restaurantsWithDishes = await Restaurant.find({
        signatureDish: { $exists: true },
      })
        .select({ signatureDish: 1, name: 1 })
        .populate("signatureDish")
        .exec();

      const dishes = restaurantsWithDishes.map((r: Partial<IRestaurant>) => ({
        signatureDish: r.signatureDish,
        restaurantName: r.name,
      }));
      console.log("dishes", dishes);

      return { success: dishes };
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
  let deleted;
  try {
    const session = await conn.startSession();
    await session.withTransaction(async () => {
      await Dish.deleteMany({ restaurant: _id }, { session });
      deleted = await Restaurant.findByIdAndDelete(_id, { session });
    });

    session.endSession();

    return { success: deleted?._id ? true : false };
  } catch (error) {
    return { error };
  }
};
