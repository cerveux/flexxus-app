import { Request } from "express";

export interface AuthAttributes {
    username: string;
    password: string;
}

export interface AuthRequest extends Request {
    body: AuthAttributes;
}

export interface AuthUserRequest extends Request {
    user?: string;
}