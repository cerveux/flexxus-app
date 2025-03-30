import { NextFunction, Request, Response } from "express";
import { ParamsDictionary, RequestHandler } from "express-serve-static-core";
import { handleAndInsertError } from "../helpers/error.helpers";
import { CustomError } from "../helpers/customError.helpers";

export const asyncHandler = <T extends ParamsDictionary>( controller: RequestHandler<T> ) => {
  return ( req: Request<T>, res: Response, next: NextFunction ) => {
    return Promise.resolve( controller( req, res, next ) ).catch( next );
  };
};

export const errorHandler = async ( error: CustomError, req: Request, res: Response, _next: NextFunction ) => {
  await handleAndInsertError( error );
  res.status( error.code || 500  ).json( {
    error: error.message
  } );
} ;