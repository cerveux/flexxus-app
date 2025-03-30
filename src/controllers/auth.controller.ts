import { Response } from "express";
import bcrypt from "bcrypt";
import { AuthRequest } from "../interfaces/auth.interface";
import { CustomError } from "../helpers/customError.helpers";
import { generateJWT } from "../helpers/jwtGenerator.helper";
import { UserMethods } from "../models/methods";

export const login = async ( req: AuthRequest, res: Response ): Promise<void> => {
  const { username, password } = req.body;

  const { results } = await UserMethods.getUserByUsername( username );

  if ( ! results || !bcrypt.compareSync( password, results.password ) ){
    throw new CustomError( "Incorrect username or password", 401 );
  }

  const { token, code } = await generateJWT( username );

  const userData = {
    user: {
      username,
      name: results.name,
      lastname: results.lastname,

    },
    token,
    message: "Access granted."
  };

  res.status( code ).json( userData );
};