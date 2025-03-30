import request from "supertest";
import { testApp } from "./server-test";

export const authenticatedRequest = request.agent( testApp );

export const unauthenticatedRequest = request( testApp );