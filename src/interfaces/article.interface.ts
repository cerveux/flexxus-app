import { Request } from "express";

export interface ArticleAttributes {
  id?: number;
  name: string;
  brand: string;
  active?: boolean;
  updatedAt?: Date;
}

export interface ArticleUpdateAttributes {
  name?: string;
  brand?: string;
  active?: boolean;
}

export interface ArticlePostRequest extends Request {
  body: {
      name: string;
      brand: string;
  }
}

export interface ArticlePaginationRequest extends Request{
  query:{
    page?:string
    order?:string
    name?:string
    exact?:string
    active?:string
  }
}

export interface ArticleUpdateRequest extends Request {
  params:{
      id: string;
  }
  body: ArticleUpdateAttributes
}