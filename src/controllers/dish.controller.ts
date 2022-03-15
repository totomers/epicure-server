import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import IDish from "../interfaces/dish.interface";
import Dish from "../models/dish.model";
import { ok, err } from "../_helpers";
const NAMESPACE = "Controllers dish.ts";

const getAllDishes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "getAllDishes function called");
  try {
    const dishes = await Dish.find().exec();
    ok(res, { dishes }, true);
  } catch (error) {
    err(res, error);
  }
};

const createDish = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "createDish function called");

  try {
    const { name, url, ingredients, tags, price, restaurant } =
      req.body as Partial<IDish>;
    const newDish = new Dish({
      name,
      url,
      ingredients,
      tags,
      price,
      restaurant,
    });
    const dish = await newDish.save();
    ok(res, { newDish: dish }, true);
  } catch (error) {
    err(res, error);
  }
};

export default {
  getAllDishes,
  createDish,
};
