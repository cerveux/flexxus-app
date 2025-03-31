import { ValidationChain, body, param, query } from "express-validator";
import { RequestHandler } from "express-serve-static-core";
import { validateErrors } from "../middlewares";


const brand: ValidationChain = body( "brand" ).isAlphanumeric( "es-ES", { ignore: " - ,.():" } )
  .withMessage( "One of the special characters entered is not allowed. \nOnly / - , . ( ) and : are allowed." )
  .trim().isLength( { min: 1, max: 50 } ).withMessage( "The brand must be between 1 and 50 characters." )
  .optional( { nullable: true } ).escape();

const name: ValidationChain = body( "name" ).isAlphanumeric( "es-ES", { ignore: " - ,.():" } )
  .withMessage( "One of the special characters entered is not allowed. \nOnly / - , . ( ) and : are allowed." )
  .trim().isLength( { min: 1, max: 50 } ).withMessage( "The name must be between 1 and 50 characters." )
  .optional( { nullable: true } ).escape();

const id: ValidationChain = param( "id" ).isInt().withMessage( "The id value must be a number." )
  .not().isEmpty().withMessage( "The id is required." );

export const postArticle: ValidationChain|RequestHandler[] = [
  name,
  body( "name" ).not().isEmpty().withMessage( "The name is required." ),
  brand,
  body( "brand" ).not().isEmpty().withMessage( "The brand is required." ),
  validateErrors
];

export const getAllArticles: ValidationChain|RequestHandler[] = [
  query( "page" ).isInt().withMessage( "Page must be a number" ).optional( ),
  query( ["order"] ).toUpperCase().
    isIn( ["ASC", "DESC"] ).withMessage( "No valid value was provided for the search, use ASC or DESC" )
    .optional( { nullable: true } ),
  query( "name" ).isLength( { max: 10 } ).withMessage( "The name can have a maximum of 10 characters." )
    .optional( { nullable: true } ),
  query( "exact" ).toLowerCase().isIn( ["true", "false"] ).withMessage( "The exact value must be true or false." )
    .optional( { nullable: true } ),
  query( "active" ).toLowerCase().isIn( ["true", "false"] ).withMessage( "The active value must be true or false." )
    .optional( { nullable: true } ),
  validateErrors
];

export const updateArticle: ValidationChain|RequestHandler[] = [
  id,
  name,
  brand,
  validateErrors
];

export const ArticleById: ValidationChain|RequestHandler[] = [
  id,
  validateErrors
];