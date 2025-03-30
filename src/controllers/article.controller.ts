import {
  // Request,
  Response } from "express";
import {
  ArticlePaginationRequest,
  ArticlePostRequest,
  ArticleUpdateRequest
} from "../interfaces/article.interface";
import { ArticleMethods } from "../models/methods";


export const postArticle = async ( req: ArticlePostRequest, res: Response ): Promise<void> => {
  const { name, brand } = req.body;

  const { message, code, results }  =  await ArticleMethods.createArticle( { name, brand } );

  res.status( code ).json( { message, results } );
};

export const getArticles = async ( req: ArticlePaginationRequest, res: Response ): Promise<void> => {
  const { order, page, name, exact, active } = req.query;

  const isExact = exact === "true";
  const isActive = active !== "false";

  const { results, code, totalItems, totalPages } = await ArticleMethods.getArticles( order, page, name, isExact, isActive );

  res.status( code ).json( { totalItems, totalPages, results } );
};

export const updateArticle = async ( req: ArticleUpdateRequest, res: Response ): Promise<void> => {
  const id = Number( req.params.id );
  const { name, brand } = req.body;

  const { message, code } = await ArticleMethods.updateArticle( id, { name, brand }  );

  res.status( code ).json( { message } );
};

export const deleteArticle = async ( req: ArticleUpdateRequest, res: Response ): Promise<void> => {
  const id = Number( req.params.id );

  const { code } = await ArticleMethods.updateArticle( id, { active: false } );

  res.status( code ).json( { message: `Article with id ${id} has been set as inactive successfully.` } );
};

