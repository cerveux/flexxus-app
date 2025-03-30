import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { AuthUserRequest } from "../interfaces/auth.interface";
import { CustomError } from "../helpers/customError.helpers";
import { UserAttributes } from "../interfaces/user.interface";


export const checkAuth = async ( req: AuthUserRequest, res: Response, next: NextFunction ): Promise<void> => {
  const authHeader : string = req.headers.authorization as string;
  try {
    if( !authHeader  ) throw new CustomError( "The JWT is required.", 401 );
    const token = authHeader.split( " " )[ 1 ];
    jwt.verify( token, config.secret!, ( err, decoded ) => {
      if ( err || !decoded ) {
        throw new CustomError( "Invalid Token. Please login again.", 401 );
      }
      const { username } = decoded as UserAttributes;
      req.user = username;
      return next();
    } );
  } catch ( error ) {
    if ( error instanceof CustomError ) {
      res.status( error.code ).json( { message: error.message } );
      return;
    } else {
      const err = error as Error;
      res.status( 500 ).json( { message: err.message, fn: "checkAuth", file: "auth.middleware" } );
      return;
    }
  }
};