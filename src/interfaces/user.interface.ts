import { Request } from "express";

export interface UserAttributes {
  id?: number;
  username: string;
  name: string;
  lastname: string;
  dni: string;
  password: string;
}

export interface UserRequest extends Request{
  body: UserAttributes;
}