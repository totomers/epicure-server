import IUser from "../interfaces/user.interface";
import IHandlerResults from "../interfaces/handlerResults.interface";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt, { verify } from "jsonwebtoken";
import config from "../config/config";
import Token from "../models/token.model";

export const authenticateUserDb = async (
  email: string,
  password: string
): Promise<IHandlerResults> => {
  try {
    const user = await User.findOne({ email });
    if (!user._id)
      return {
        error: new Error("Please check if email or passowrd is correct."),
        code: 400,
      };
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return {
        error: new Error("Please check if email or passowrd is correct."),
      };

    const refreshToken = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "1w",
    });

    const date = new Date();
    date.setDate(date.getDate() + 7);

    await Token.create({
      userId: user._id,
      token: refreshToken,
      expiredAt: date,
    });
    console.log("token expires at:", date);

    const accessToken = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "10s",
    });
    return {
      success: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    return { error };
  }
};

export const createUserDb = async (credentials: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<IHandlerResults> => {
  try {
    const { firstName, lastName, email, password } = credentials;
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    });
    // const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    return {
      success: {
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        email: user.email,
      },
    };
  } catch (error) {
    return { error };
  }
};

export const refresh = async (
  refreshToken: string
): Promise<IHandlerResults> => {
  try {
    const payload = verify(refreshToken, config.jwtSecret);
    if (!payload)
      return {
        error: new Error("Unauthenticated."),
        code: 401,
      };

    const refreshTokenDb = await Token.findOne({
      userId: payload._id,
      expiredAt: { $gte: new Date() },
    });
    if (!refreshTokenDb?._id)
      return {
        error: new Error("Unauthenticated."),
        code: 401,
      };

    const accessToken = jwt.sign({ _id: payload._id }, config.jwtSecret, {
      expiresIn: "30s",
    });

    return {
      success: {
        accessToken,
      },
    };
  } catch (error) {
    return {
      error,
      code: 401,
    };
  }
};
export const getAuthenticatedUserDb = async (
  accessToken: string
): Promise<IHandlerResults> => {
  try {
    const payload = verify(accessToken, config.jwtSecret);
    if (!payload)
      return {
        error: new Error("Unauthenticated."),
        code: 401,
      };

    const user = await User.findById(payload._id);
    delete user.password;

    return {
      success: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    };
  } catch (error) {
    return {
      error,
      code: 401,
    };
  }
};

export const logoutDb = async (
  refreshToken: string
): Promise<IHandlerResults> => {
  try {
    const deletedToken = await Token.findOneAndDelete({
      token: refreshToken,
    });

    return {
      success: {
        deleted: true,
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export const isEmailTakenDb = async (
  email: string
): Promise<IHandlerResults> => {
  try {
    console.log(email);

    const user = await User.findOne({ email });
    return {
      success: {
        isEmailTaken: user?._id ? true : false,
      },
    };
  } catch (error) {
    return { error };
  }
};
