import { ValidationChain, body } from "express-validator";
import { RequestHandler } from "express-serve-static-core";
import { validateErrors } from "../middlewares";
import { capitalizeFirstLetter } from "../helpers/validators";


const name: ValidationChain = body( "name" ).isAlpha( "es-ES" ).withMessage( "Only letters are allowed" ).trim()
  .isLength( { min: 3, max: 15 } ).withMessage( "The name's length should be between 3 and 15 characters." )
  .customSanitizer( capitalizeFirstLetter ).optional();

const username: ValidationChain = body( "username" ).isAlpha( "es-ES" ).withMessage( "Only letters are allowed" ).trim()
  .isLength( { min: 3, max: 15 } ).withMessage( "The username length should be between 3 and 15 characters." ).optional();

const lastName: ValidationChain = body( "lastname" ).isAlpha( "es-ES" ).withMessage( "Only letters are allowed" ).trim()
  .isLength( { min: 3, max: 15 } ).withMessage( "The lastname's length should be between 3 and 15 characters." )
  .customSanitizer( capitalizeFirstLetter ).optional();

const password: ValidationChain = body( "password" ).isLength( { min: 6, max: 6 } )
  .withMessage( "The password's length should have a length of 6 characters." )
  .matches( /^(?=.*[a-z])[a-zA-Z0-9 ]+$/ ).withMessage( "The password must have at least 1 lowercase." )
  .matches( /^(?=.*[A-Z])[a-zA-Z0-9 ]+$/ ).withMessage( "The password must have at least 1 uppercase." )
  .matches( /^(?=.*[0-9])[a-zA-Z0-9 ]+$/ ).withMessage( "The password must have at least 1 number." ).optional()
  .matches( /^[a-zA-Z0-9]+$/ ).withMessage( "The password can't have an empty space." ).optional();

export const postEmployee: ValidationChain|RequestHandler[] = [
  name,
  body( "name" ).not().isEmpty().withMessage( "The name is required." ),
  username,
  body( "username" ).not().isEmpty().withMessage( "The username is required." ),
  lastName,
  body( "lastname" ).not().isEmpty().withMessage( "The lastname is required." ),
  password,
  body( "password" ).not().isEmpty().withMessage( "The password is required." ),
  validateErrors
];
