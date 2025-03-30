
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { CustomError } from "./customError.helpers";



export const generateJWT = ( username: string ) => {
  try {
    const token = jwt.sign(
      {
        username,
      },
      config.secret!,
      { expiresIn: "24h" }
    );
    return { token, code: 200 };
  } catch ( error ) {
    const err = error as Error;
    throw new CustomError( `${err.message}`, 500 );
  }
};