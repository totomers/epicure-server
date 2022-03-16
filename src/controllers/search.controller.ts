import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import IRestaurant from "../interfaces/restaurant.interface";
import Restaurant from "../models/restaurant.model";
import Chef from "../models/chef.model";
import Dish from "../models/dish.model";
import { ok, err } from "../_helpers";
const NAMESPACE = "Controllers search.ts";

const getAllContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "getAllContent function called");

  try {
    const { name } = req.params;
    console.log("name", name);

    const restaurants = await Restaurant.find({
      name: { $regex: name, $options: "i" },
    });
    const dishes = await Dish.find({
      name: { $regex: name, $options: "i" },
    });
    const chefs = await Chef.find({
      name: { $regex: name, $options: "i" },
    });

    ok(res, { results: { restaurants, dishes, chefs } });
  } catch (error) {
    err(res, error);
  }
};

export default {
  getAllContent,
};
