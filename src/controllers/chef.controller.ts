import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import {
  createChefDb,
  deleteChefDb,
  getAllChefsDb,
  getChefDb,
  getWeeklyChefDb,
  updateChefDb,
} from "../handlers/chef.handler";
import IChef from "../interfaces/chef.interface";
import { ok, err } from "../_helpers";

const NAMESPACE = "Controllers chef.ts";

const getAllChefs = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "gertAllChefs function called");
  const results = await getAllChefsDb();
  if (results.error) err(res, results.error);
  else ok(res, { chefs: results.success });
};

const getChef = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getChef function called");
  const { _id } = req.params;
  const results = await getChefDb(_id);
  if (results.error) err(res, results.error);
  else ok(res, { chef: results.success });
};

const createChef = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "createChef function called");
  const { name, url, descr } = req.body as Partial<IChef>;
  const results = await createChefDb({ name, url, descr });
  if (results.error) err(res, results.error);
  else ok(res, { newChef: results.success }, true);
};

const getWeeklyChef = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getChef function called");
  const results = await getWeeklyChefDb();
  if (results.error) err(res, results.error);
  else ok(res, { weeklyChef: results.success });
};

const updateChef = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "updateChef function called");
  const { _id } = req.params;
  const { name, descr, isWeekly, url } = req.body as Partial<IChef>;
  const results = await updateChefDb({ name, descr, isWeekly, url, _id });
  if (results.error) err(res, results.error);
  else ok(res, { updatedChef: results.success }, true);
};
const deleteChef = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getChef function called");
  const { _id } = req.params;
  const results = await deleteChefDb(_id);
  if (results.error) err(res, results.error);
  else ok(res, { deleted: results.success });
};

export default {
  getAllChefs,
  getChef,
  createChef,
  getWeeklyChef,
  deleteChef,
  updateChef,
};
