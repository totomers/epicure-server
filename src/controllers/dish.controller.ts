import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import {
  createDishDb,
  deleteDishDb,
  getAllDishesDb,
  updateDishDb,
} from "../handlers/dish.handler";
import IDish from "../interfaces/dish.interface";
import { ok, err } from "../_helpers";
const NAMESPACE = "Controllers dish.ts";

const getAllDishes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "getAllDishes function called");
  const results = await getAllDishesDb();
  if (results.error) err(res, results.error);
  else ok(res, { dishes: results.success }, true);
};

const createDish = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "createDish function called");

  const { name, url, ingredients, tags, price, restaurant } =
    req.body as Partial<IDish>;
  const results = await createDishDb({
    name,
    url,
    ingredients,
    tags,
    price,
    restaurant,
  });
  if (results.error) err(res, results.error);
  else ok(res, { newDish: results.success }, true);
};
const updateDish = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "updateDish function called");
  const { _id } = req.params;
  const { name, url, price, tags, ingredients, restaurant } =
    req.body as Partial<IDish>;
  const results = await updateDishDb({
    name,
    url,
    price,
    tags,
    ingredients,
    restaurant,
    _id,
  });
  if (results.error) err(res, results.error);
  else ok(res, { updatedDish: results.success }, true);
};

const deleteDish = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "deleteDish function called");
  const { _id } = req.params;
  const results = await deleteDishDb(_id);
  if (results.error) err(res, results.error);
  else ok(res, { deleted: results.success });
};

export default {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
};
