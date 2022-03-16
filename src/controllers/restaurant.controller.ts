import { Request, Response } from "express";
import logging from "../config/logging";
import {
  createRestaurantDb,
  deleteRestaurantDb,
  getAllRestaurantsDb,
  getPopularRestaurantsDb,
  getRestaurantsOfChefDb,
  updateRestaurantDb,
} from "../handlers/restaurant.handler";
import IRestaurant from "../interfaces/restaurant.interface";
import { ok, err } from "../_helpers";
const NAMESPACE = "Controllers restaurant.ts";

const getAllRestaurants = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getAllRestaurants function called");
  const results = await getAllRestaurantsDb();
  if (results.error) err(res, results.error);
  else ok(res, { restaurants: results.success });
};
const getPopularRestaurants = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getPopularRestaurants function called");
  const results = await getPopularRestaurantsDb();
  if (results.error) err(res, results.error);
  else ok(res, { restaurants: results.success });
};

const getRestaurantsOfChef = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getRestaurantsOfChef function called");
  const { id } = req.params;
  const results = await getRestaurantsOfChefDb(id);
  if (results.error) err(res, results.error);
  else ok(res, { restaurants: results.success });
};

const createRestaurant = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "createRestaurant function called");
  const { name, url, chef, isPopular } = req.body as Partial<IRestaurant>;
  const results = await createRestaurantDb({ name, url, chef, isPopular });
  if (results.error) err(res, results.error);
  else ok(res, { newRestaurant: results.success });
};

const updateRestaurant = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "createTopic function called");
  const { _id } = req.params;
  const { name, url, chef, isPopular } = req.body as Partial<IRestaurant>;
  const results = await updateRestaurantDb({ name, url, chef, isPopular, _id });
  if (results.error) err(res, results.error);
  else ok(res, { updatedRestaurant: results.success });
};

const deleteRestaurant = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "createTopic function called");
  const { _id } = req.params;
  const results = await deleteRestaurantDb(_id);
  if (results.error) err(res, results.error);
  else ok(res, { deleted: results.success });
};

export default {
  getAllRestaurants,
  getPopularRestaurants,
  getRestaurantsOfChef,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
