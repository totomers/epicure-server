import { Request, Response } from "express";
import logging from "../config/logging";
import {
  createRestaurantDb,
  deleteRestaurantDb,
  getAllRestaurantsDb,
  getPopularRestaurantsDb,
  getRestaurantDb,
  getRestaurantsOfChefDb,
  getRestaurantsSignatureDishesDb,
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
  console.log("results", results);

  if (results.error) err(res, results.error);
  else ok(res, { restaurants: results.success });
};

const getRestaurantsOfChef = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getRestaurantsOfChef function called");
  const { _id } = req.params;
  const results = await getRestaurantsOfChefDb(_id);
  if (results.error) err(res, results.error);
  else ok(res, { restaurants: results.success });
};

const getRestaurantsSignatureDishes = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getSignatureDishesOfRestaurants function called");
  const results = await getRestaurantsSignatureDishesDb();
  if (results.error) err(res, results.error);
  else ok(res, { signatureDishes: results.success });
};

const getRestaurant = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getRestaurant function called");
  const { _id } = req.params;
  const results = await getRestaurantDb(_id);
  if (results.error) err(res, results.error);
  else ok(res, { restaurant: results.success }, true);
};

const createRestaurant = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "createRestaurant function called");
  const { name, url, chef, isPopular, signatureDish } =
    req.body as Partial<IRestaurant>;
  const results = await createRestaurantDb({
    name,
    url,
    chef,
    isPopular,
    signatureDish,
  });

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
  getRestaurant,
  getRestaurantsSignatureDishes,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
