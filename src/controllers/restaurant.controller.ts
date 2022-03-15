import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import IRestaurant from "../interfaces/restaurant.interface";
import Restaurant from "../models/restaurant.model";
import { ok, err } from "../_helpers";
const NAMESPACE = "Controllers restaurant.ts";

const getAllRestaurants = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "getAllRestaurants function called");

  Restaurant.find()
    .populate("chef")
    .exec()
    .then((restaurants) => {
      ok(res, { restaurants }, true);
    })
    .catch((error) => err(res, error));
};
const getPopularRestaurants = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "getPopularRestaurants function called");

  Restaurant.find({ isPopular: true })
    .populate("chef")
    .exec()
    .then((restaurants) => {
      ok(res, { restaurants }, true);
    })
    .catch((error) => err(res, error));
};

const createRestaurant = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "createRestaurant function called");
  const { name, url, chef, isPopular } = req.body as Partial<IRestaurant>;

  const newRestaurant = new Restaurant({ name, url, chef, isPopular });
  newRestaurant
    .save()
    .then((newRestaurant) => {
      ok(res, { newRestaurant }, true);
    })
    .catch((error) => err(res, error));
};
const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "createTopic function called");
  const { _id } = req.params;
  const { name, image, chef, dishes } = req.body;
  const update = { name, image, chef, dishes };
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(_id, update, {
      new: true,
    });
    ok(res, { updatedRestaurant });
  } catch (error) {
    err(res, error);
  }
};

const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "createTopic function called");
  const { _id } = req.params;
  const { name, image, chef, dishes } = req.body;
  const update = { name, image, chef, dishes };
  try {
    const deleted = await Restaurant.findByIdAndDelete(_id);
    ok(res, { deleted: deleted._id ? true : false });
  } catch (error) {
    err(res, error);
  }
};

export default {
  getAllRestaurants,
  getPopularRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
