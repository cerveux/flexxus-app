
import { sequelizeConnection, sequelizeDisconnection } from "./utils/bulks";

import { UserMocks } from "./mocks";
import { authenticatedRequest } from "./utils/supertest";

describe( "User Routes", () => {
  const request = authenticatedRequest;

  beforeAll( async () => {
    await sequelizeConnection();
  }, 30000 );


  afterAll( async () => {
    await sequelizeDisconnection();
  }, 30000 );

  describe( "POST /api/user", () => {

    test( "should create a User", async () => {
      const { status, body } = await request
        .post( "/api/user" )
        .send( UserMocks[0] );

      expect( status ).toBe( 201 );
      expect( body ).toEqual( { message: "New User registered successfully." } );
    } );

    test( "should fail to post user because of required attributes", async () => {
      const { status, body } = await request.post( "/api/user" ).send( {} );
      expect( status ).toBe( 400 );

      expect( body.errors[0] ).toHaveProperty( "path", "name" );
      expect( body.errors[0] ).toHaveProperty( "msg", "The name is required." );
      expect( body.errors[1] ).toHaveProperty( "path", "username" );
      expect( body.errors[1] ).toHaveProperty( "msg", "The username is required." );
      expect( body.errors[2] ).toHaveProperty( "path", "lastname" );
      expect( body.errors[2] ).toHaveProperty( "msg", "The lastname is required." );
      expect( body.errors[3] ).toHaveProperty( "path", "password" );
      expect( body.errors[3] ).toHaveProperty( "msg", "The password is required." );
    } );

    test( "should fail to post user because the username has to be unique", async () => {
      const { status, body } = await request.post( "/api/user" ).send(  UserMocks[0] );

      expect( status ).toBe( 400 );
      expect( body ).toEqual( {
        "error": "That username is already taken."
      } );

    } );

    test( "should fail to post user because of common error", async () => {
      const newUser = {
        username: "D1",
        name: "D1",
        lastname: "G2",
        password: "Hola12",
      };
      const { status, body } = await request.post( "/api/user" ).send( newUser );

      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          "errors": [
            {
              "msg": "Only letters are allowed",
              "path": "name",
            },
            {
              "msg": "The name's length should be between 3 and 15 characters.",
              "path": "name",
            },
            {
              "msg": "Only letters are allowed",
              "path": "username",
            },
            {
              "msg": "The username length should be between 3 and 15 characters.",
              "path": "username",
            },
            {
              "msg": "Only letters are allowed",
              "path": "lastname",
            },
            {
              "msg": "The lastname's length should be between 3 and 15 characters.",
              "path": "lastname",
            }
          ]
        }
      );
    } );

    test( "should fail to post user because of password errors", async () => {
      const newUser = {
        username: "testuser",
        name: "test",
        lastname: "user",
        password: "--- --",
      };
      const { status, body } = await request.post( "/api/user" ).send( newUser );

      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          "errors": [
            {
              "msg": "The password must have at least 1 lowercase.",
            },
            {
              "msg": "The password must have at least 1 uppercase.",
            },
            {
              "msg": "The password must have at least 1 number.",
            },
            {
              "msg": "The password can't have an empty space.",
            }
          ]
        }
      );
    } );
  } );
} );