import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { ArticleRoute, AuthRoute, UserRoute } from "./routes";
import { errorHandler } from "./middlewares";
import swaggerDocs from "./config/swagger";

const app: Application = express();

app.use( cors() );

// Swagger documentation
swaggerDocs( app );


// Middlewares
app.use( express.json() );

app.use( morgan( "short" ) );


// Routes
app.use( "/api/article", ArticleRoute );
app.use( "/api/auth", AuthRoute );
app.use( "/api/user", UserRoute );

app.all( "*", ( _req, res ) =>{ res.status( 404 ).json( { message: "This path doesn't exist." } );} );

app.use( "*", errorHandler );


export default app;