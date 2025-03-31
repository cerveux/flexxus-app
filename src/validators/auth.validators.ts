import { ValidationChain, body } from "express-validator";
import { RequestHandler } from "express-serve-static-core";
import { validateErrors } from "../middlewares";
import { emptyToNull } from "../helpers/validators";


const username: ValidationChain = body( "username" ).customSanitizer( emptyToNull ).isLength( { min: 3, max: 15 } )
  .withMessage( "The username's length should have a length between 3 and 15 characters." ).optional();

const password: ValidationChain = body( "password" ).isString().withMessage( "The password must be a string." ).optional();

export const login: ValidationChain|RequestHandler[] = [
  username,
  body( "username" ).not().isEmpty().withMessage( "The username is required." ),
  password,
  body( "password" ).not().isEmpty().withMessage( "The password is required." ),
  validateErrors
];