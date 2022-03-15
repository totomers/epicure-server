import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import IChef from "../interfaces/chef.interface";
import Chef from "../models/chef.model";
import { ok, err } from "../_helpers";
const NAMESPACE = "Controllers chef.ts";

const getAllChefs = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "gertAllChefs function called");

  Chef.find()
    .exec()
    .then((chefs) => {
      ok(res, { chefs }, true);
    })
    .catch((error) => err(res, error));
};

const createChef = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "createChef function called");
  const { name, url, descr } = req.body as Partial<IChef>;

  const newChef = new Chef({ name, url, descr });
  newChef
    .save()
    .then((newChef) => {
      ok(res, { newChef }, true);
    })
    .catch((error) => err(res, error));
};

const getChef = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "getChef function called");

  Chef.find()
    .exec()
    .then((chefs) => {
      ok(res, { chefs }, true);
    })
    .catch((error) => err(res, error));
};

export default {
  getAllChefs,
  createChef,
  getChef,
};
