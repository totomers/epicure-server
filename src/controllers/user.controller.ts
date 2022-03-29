import { Request, Response } from "express";
import logging from "../config/logging";
import {
  createUserDb,
  authenticateUserDb,
  refresh,
  getAuthenticatedUserDb,
  logoutDb,
  isEmailTakenDb,
} from "../handlers/user.handler";
import IUser from "../interfaces/user.interface";
import { ok, err, errMissing } from "../_helpers";
const NAMESPACE = "Controllers restaurant.ts";

const authenticateUser = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getUser function called");
  const { email, password } = req.body;
  const results = await authenticateUserDb(email, password);
  if (results.error) err(res, results.error, results.code);
  else {
    res.cookie("refreshToken", results.success.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); // 7 days

    const user = {
      firstName: results.success.firstName,
      lastName: results.success.lastName,
      email: results.success.email,
      _id: results.success._id,
      token: results.success.accessToken,
    };
    ok(res, { user });
  }
};

const getAuthenticatedUser = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "getAuthenticatedUser function called");
  const accessToken = req.header("Authorization")?.split(" ")[1] || "";
  console.log(accessToken);

  const results = await getAuthenticatedUserDb(accessToken);
  if (results.error) err(res, results.error, results.code);
  else {
    ok(res, { user: results.success });
  }
};
const createUser = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "createUser function called");
  const { firstName, lastName, email, password } = req.body as Partial<IUser>;
  const results = await createUserDb({ firstName, lastName, email, password });
  if (results.error) err(res, results.error, results.code);
  else ok(res, { user: results.success });
};
const refreshAccessToken = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "refreshAccessToken function called");
  const refreshToken = req.cookies["refreshToken"];
  const results = await refresh(refreshToken);
  if (results.error) err(res, results.error, results.code);
  else {
    ok(res, { token: results.success.accessToken });
  }
};
const logout = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, "logout function called");
  const refreshToken = req.cookies["refreshToken"];
  const results = await logoutDb(refreshToken);
  res.cookie("refreshToken", "", { maxAge: 0 });
  if (results.error) err(res, results.error, results.code);
  else {
    ok(res, { loggedOut: true });
  }
};

export const isEmailTaken = async (req: Request, res: Response) => {
  console.log("hiiii");

  const { email } = req.body;
  // if (!email) errMissing(res);
  const results = await isEmailTakenDb(email);
  if (results.error) err(res, results.error, results.code);
  else {
    ok(res, { isEmailTaken: results.success.isEmailTaken });
  }
};
export default {
  authenticateUser,
  createUser,
  refreshAccessToken,
  logout,
  getAuthenticatedUser,
  isEmailTaken,
};
