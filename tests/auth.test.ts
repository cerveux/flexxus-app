
import { sequelizeConnection, sequelizeDisconnection } from "./utils/bulks";

import { UserMocks } from "./mocks";
import { authenticatedRequest } from "./utils/supertest";

describe( "Auth Routes", () => {
  const request = authenticatedRequest;

  beforeAll( async () => {
    await sequelizeConnection();
  }, 30000 );

  afterAll( async () => {
    await sequelizeDisconnection();
  }, 30000 );

  describe( "POST /api/auth/login", () => {

    test( "should authenticate User", async () => {
      await request
        .post( "/api/user" )
        .send( UserMocks[0] );

      const { status, body } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      expect( status ).toBe( 200 );
      expect( body ).toMatchObject(
        {
          message: "Access granted.",
          user: {
            username: UserMocks[0].username,
            name: UserMocks[0].name,
            lastname: UserMocks[0].lastname,
          }
        } );
      expect( body ).toHaveProperty( "token" );
    } );

    test( "should fail athentication because of required attributes", async () => {
      const { status, body } = await request.post( "/api/auth/login" ).send( {} );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              msg: "The username is required.",
              path: "username",
            },
            {
              msg: "The password is required.",
              path: "password"
            }
          ]
        }
      );

    } );

    test( "should fail athentication because of common error", async () => {
      const wrongUser = {
        username: "D1",
        password: 12,
      };
      const { status, body } = await request.post( "/api/auth/login" ).send( wrongUser );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              "msg": "The username's length should have a length between 3 and 15 characters.",
              "path": "username",
            },
            {
              "msg": "The password must be a string.",
              "path": "password",
            }
          ]
        }
      );
    } );

    test( "should fail athentication because of password errors", async () => {
      const wrongCredentials = {
        username: "mindful",
        password: "Ab1234",
      };

      const { status, body } = await request.post( "/api/auth/login" ).send( wrongCredentials );
      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "error": "Incorrect username or password"
        }
      );
    } );
  } );
} );