import express, { Application } from "express";
import morgan from "morgan";
import {  } from "./routes";

const app: Application = express();

// Swagger documentation


// Middlewares
app.use( express.json() );

app.use( morgan( "short" ) );


// Routes

app.all( "*", ( _req, res ) =>{ res.status( 404 ).json( { message: "This path doesn't exist." } );} );


export default app;