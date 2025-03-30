import { Op } from "sequelize";
import { ArticleAttributes, ArticleUpdateAttributes } from "../../interfaces/article.interface";
import {
  ResponseAttributes,
  ResponseResultsOneObject,
  ResponseResultsPagination
} from "../../interfaces/response.interface";
import { ArticleModel } from "../index";
import { CustomError } from "../../helpers/customError.helpers";
import { SqlError } from "../../interfaces/error.interface";


/**
 * Creates a new article
 */
export const createArticle = async ( article: ArticleAttributes ):Promise<ResponseResultsOneObject<ArticleModel>> => {
  try {
    const newArticle = await ArticleModel.create( article );
    return {
      results: newArticle,
      code: 200,
      message: "New article created succesfully",
    };
  } catch ( error ) {
    const err = error as SqlError;
    if ( err.parent?.sqlState == "23000" ) throw new CustomError( `${err.parent.sqlMessage}`, 403 );
    throw new CustomError( `${err.message}`, 500 );
  }
};

/**
 * Returns all articles
 */
export const getArticles = async (
  order:string = "ASC",
  offset:string|number = 1,
  name:string = "",
  exact:boolean = false,
  active:boolean = true,
): Promise<ResponseResultsPagination<ArticleModel>> => {

  const where = {
    [Op.and]: [
      { active },
      { name: { [Op.like]: exact ? `${name}` : `%${name}%` } }
    ]
  };

  const { rows, count }  = await ArticleModel.findAndCountAll( {
    where,
    order:[["name", order]],
    limit: 20,
    offset: 20 * ( Number( offset ) - 1 ),
  } );

  return {
    results: rows,
    totalItems: count,
    totalPages: Math.ceil( count / 20 ),
    code: 200
  };
};

/**
 * Updates article by id
 */
export const updateArticle =
async ( id: number, updatedValues : ArticleUpdateAttributes ): Promise<ResponseAttributes> => {
  try {
    const [updatedCount] = await ArticleModel.update( ( updatedValues ), { where: { id } } );

    if ( !updatedCount ) throw new CustomError( `There is no Article registered with id ${id}.`, 404 );

    return {
      message: "Article updated successfully.",
      code: 200
    };
  } catch ( error ) {
    const err = error as SqlError;
    if ( err.parent?.sqlState == "23000" ) throw new CustomError( `${err.parent.sqlMessage}`, 403 );
    throw new CustomError( `${err.message}`, 500 );
  }
};

