
import { sequelizeConnection, sequelizeDisconnection } from "./utils/bulks";

import { ArticleMocks, UserMocks } from "./mocks";
import { authenticatedRequest } from "./utils/supertest";

describe( "Article Routes", () => {
  const request = authenticatedRequest;

  beforeAll( async () => {
    await sequelizeConnection();
  }, 30000 );

  afterAll( async () => {
    await sequelizeDisconnection();
  }, 30000 );

  describe( "POST /api/article", () => {

    test( "should create an article correctly", async () => {
      await request
        .post( "/api/user" )
        .send( UserMocks[0] );

      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .post( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( ArticleMocks[0] );

      await request
        .post( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( ArticleMocks[1] );

      await request
        .post( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 201 );
      expect( body ).toMatchObject(
        {
          message: "New article created succesfully",
          results: {
            active: true,
            id: 1,
            name: ArticleMocks[0].name,
            brand: ArticleMocks[0].brand,
          }
        } );

    } );

    test( "should fail article creation because of required attributes", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request.post( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( {} );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              msg: "The name is required.",
              path: "name",
            },
            {
              msg: "The brand is required.",
              path: "brand"
            }
          ]
        }
      );

    } );

    test( "should fail article creation because of common validations", async () => {
      const wrongArticle = {
        name: "************************************************************",
        brand: "************************************************************"
      };
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request.post( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( wrongArticle );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              "msg": "One of the special characters entered is not allowed. \nOnly / - , . ( ) and : are allowed.",
              "path": "name",
            },
            {
              "msg": "The name must be between 1 and 50 characters.",
              "path": "name",
            },
            {
              "msg": "One of the special characters entered is not allowed. \nOnly / - , . ( ) and : are allowed.",
              "path": "brand",
            },
            {
              "msg": "The brand must be between 1 and 50 characters.",
              "path": "brand",
            },


          ]
        }
      );
    } );

    test( "should fail article creation because of invalid token", async () => {
      const { status, body } = await request.post( "/api/article" )
        .set( "Authorization", "Bearer cualquiercosa" )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "Invalid Token. Please login again."
        }
      );
    } );

    test( "should fail article creation because of missing token", async () => {
      const { status, body } = await request.post( "/api/article" )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "The JWT is required."
        }
      );
    } );

    test( "should fail article creation because of duplicate entry", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .post( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( ArticleMocks[0] );

      expect( status ).toBe( 403 );
      expect( body ).toEqual( { "error": "Duplicate entry 'name 1-brand 1' for key 'article.name-brand'" } );
    } );
  } );

  describe( "GET /api/article", () => {

    test( "should get articles correctly", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request.get( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` );
      expect( status ).toBe( 200 );
      expect( body ).toMatchObject(
        {
          totalItems: 3,
          totalPages: 1,
          results: [
            {
              id: 1,
              ...ArticleMocks[0]
            },
            {
              id: 2,
              ...ArticleMocks[1]
            },
            {
              id: 3,
              ...ArticleMocks[2]
            }
          ]

        }
      );

    } );

    test( "should fail to get articles because of query format", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .get( "/api/article?order=asx&page=a&active=verdadero&exact=falso&name=un nombre largo" )
        .set( "Authorization", `Bearer ${tokenBody.token}` );

      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              "msg": "Page must be a number",
              "path": "page",
            },
            {
              "msg": "No valid value was provided for the search, use ASC or DESC",
              "path": "order",
            },
            {
              "msg": "The name can have a maximum of 10 characters.",
              "path": "name",
            },
            {
              "msg": "The exact value must be true or false.",
              "path": "exact",
            },
            {
              "msg": "The active value must be true or false.",
              "path": "active",
            }

          ]
        }
      );

    } );

    test( "should fail to get articles because of missing token", async () => {
      const { status, body } = await request.get( "/api/article" )
        .set( "Authorization", "Bearer cualquiercosa" );

      expect( status ).toBe( 401 );
      expect( body ).toEqual( { "message": "Invalid Token. Please login again." } );
    } );

    test( "should fail to get articles because of missing token", async () => {
      const { status, body } = await request.get( "/api/article" );

      expect( status ).toBe( 401 );
      expect( body ).toEqual( { "message": "The JWT is required." } );
    } );

  } );

  describe( "PUT /api/article/:id", () => {

    test( "should update article by id correctly", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .put( "/api/article/2" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( { name: "Updated name" } );

      expect( status ).toBe( 200 );
      expect( body ).toMatchObject( {
        message: "Article updated successfully."
      } );


    } );

    test( "should fail to update article by id because of common validations", async () => {
      const wrongArticle = {
        name: "************************************************************",
        brand: "************************************************************"
      };

      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );
      const { status, body } = await request.put( "/api/article/1" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( wrongArticle );

      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              "msg": "One of the special characters entered is not allowed. \nOnly / - , . ( ) and : are allowed.",
              "path": "name",
            },
            {
              "msg": "The name must be between 1 and 50 characters.",
              "path": "name",
            },
            {
              "msg": "One of the special characters entered is not allowed. \nOnly / - , . ( ) and : are allowed.",
              "path": "brand",
            },
            {
              "msg": "The brand must be between 1 and 50 characters.",
              "path": "brand",
            },


          ]
        }
      );
    } );

    test( "should fail to update article by id because of invalid id", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .put( "/api/article/a" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( { name: "Updated name" } );


      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              "msg": "The id value must be a number.",
              "path": "id",
            },
          ]
        }
      );


    } );

    test( "should fail article update because of invalid token", async () => {
      const { status, body } = await request.put( "/api/article/1" )
        .set( "Authorization", "Bearer cualquiercosa" )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "Invalid Token. Please login again."
        }
      );
    } );

    test( "should fail article update because of missing token", async () => {
      const { status, body } = await request.put( "/api/article/1" )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "The JWT is required."
        }
      );
    } );

    test( "should fail article creation because of duplicate entry", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .put( "/api/article/3" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( ArticleMocks[0] );

      expect( status ).toBe( 403 );
      expect( body ).toEqual( { "error": "Duplicate entry 'name 1-brand 1' for key 'article.name-brand'" } );
    } );

    test( "should fail article update because id doesnt exists", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .put( "/api/article/333" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( { title: "Updated title" } );

      expect( body ).toMatchObject( {
        error: "There is no Article registered with id 333."
      } );
      expect( status ).toBe( 404 );


    } );
  } );

  describe( "DELETE /api/article/:id", () => {

    test( "should delete article by id correctly", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .delete( "/api/article/2" )
        .set( "Authorization", `Bearer ${tokenBody.token}` );

      expect( status ).toBe( 200 );
      expect( body ).toMatchObject( {
        message: "Article with id 2 has been set as inactive successfully."
      } );
    } );

    test( "should fail to delete article by id correctly because of id type", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request.delete( "/api/article/a" )
        .set( "Authorization", `Bearer ${tokenBody.token}` );

      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              value: "a",
              msg: "The id value must be a number.",
              path: "id",
            }
          ]
        }
      );
    } );

    test( "should fail article delete because of invalid token", async () => {
      const { status, body } = await request.delete( "/api/article/1" )
        .set( "Authorization", "Bearer cualquiercosa" );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "Invalid Token. Please login again."
        }
      );
    } );

    test( "should fail article delete because of missing token", async () => {
      const { status, body } = await request.delete( "/api/article/1" );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "The JWT is required."
        }
      );
    } );

    test( "should fail article delete because id doesnt exists", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .delete( "/api/article/4" )
        .set( "Authorization", `Bearer ${tokenBody.token}` );

      expect( status ).toBe( 404 );
      expect( body ).toMatchObject( {
        error: "There is no Article registered with id 4."
      } );
    } );
  } );
} );