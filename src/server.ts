import express, { Application } from "express";
import morgan from "morgan";
import { UserRoute } from "./routes";
import { errorHandler } from "./middlewares";

const app: Application = express();

// Swagger documentation


// Middlewares
app.use( express.json() );

app.use( morgan( "short" ) );


// Routes
app.use( "/api/user", UserRoute );
app.all( "*", ( _req, res ) =>{ res.status( 404 ).json( { message: "This path doesn't exist." } );} );
app.use( "*", errorHandler );


export default app;