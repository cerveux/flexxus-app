import { UserAttributes } from "../../interfaces/user.interface";
import { ResponseAttributes, ResponseResultsOneObject } from "../../interfaces/response.interface";
import { UserModel } from "../index";


/**
 * Creates a new user
 */
export const createUser = async ( user: UserAttributes ):Promise<ResponseAttributes> => {
  await UserModel.create( user );
  return {
    code: 201,
    message: "New User registered successfully." };
};

/**
 * Returns user by username
 */
export const getUserByUsername = async ( username: string ): Promise<ResponseResultsOneObject<UserModel | null> > => {
  const user = await UserModel.findOne( { where: { username } } );

  return {
    results: user,
    code: 200
  };
};

