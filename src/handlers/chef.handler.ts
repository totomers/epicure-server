import Chef from "../models/chef.model";
import IHandlerResults from "../interfaces/handlerResults.interface";
import IChef from "../interfaces/chef.interface";

export const getAllChefsDb = async (): Promise<IHandlerResults> => {
  try {
    const chefs = await Chef.find();
    return { success: chefs };
  } catch (error) {
    return { error };
  }
};

export const getChefDb = async (_id: string): Promise<IHandlerResults> => {
  try {
    const chef = await Chef.findById(_id);
    return { success: chef };
  } catch (error) {
    return { error };
  }
};

export const createChefDb = async (
  props: Partial<IChef>
): Promise<IHandlerResults> => {
  try {
    const { name, url, descr } = props;
    const newChef = new Chef({ name, url, descr });
    const chef = await newChef.save();
    return { success: chef };
  } catch (error) {
    return { error };
  }
};

export const getWeeklyChefDb = async (): Promise<IHandlerResults> => {
  try {
    const weeklyChef = await Chef.findOne({ isWeekly: true });
    return { success: weeklyChef };
  } catch (error) {
    return { error };
  }
};

export const updateChefDb = async (
  props: Partial<IChef>
): Promise<IHandlerResults> => {
  const { name, descr, isWeekly, url, _id } = props;
  try {
    const updatedChef = await Chef.findByIdAndUpdate(
      _id,
      { name, descr, isWeekly, url },
      { new: true }
    );
    return { success: updatedChef };
  } catch (error) {
    return { error };
  }
};
export const deleteChefDb = async (_id: string): Promise<IHandlerResults> => {
  try {
    const deleted = await Chef.findByIdAndDelete(_id);
    return { success: deleted._id ? true : false };
  } catch (error) {
    return { error };
  }
};
