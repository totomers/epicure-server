import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import IRestaurant from "../interfaces/restaurant.interface";
import Restaurant from "../models/restaurant.model";
import Chef from "../models/chef.model";
import Dish from "../models/dish.model";
import { ok, err } from "../_helpers";
import {
  countAllDocumentsDb,
  getAllContentDb,
} from "../handlers/search.handler";
const NAMESPACE = "Controllers search.ts";

const getAllContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "getAllContent function called");

  const { name } = req.params;
  const results = await getAllContentDb(name);
  if (results.error) err(res, results.error);
  ok(res, { results: results.success });
};
const countAllDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "countAllDocuments function called");

  const { name } = req.params;
  const results = await countAllDocumentsDb(name);
  if (results.error) err(res, results.error);
  ok(res, results.success);
};

export default {
  getAllContent,
  countAllDocuments,
};
