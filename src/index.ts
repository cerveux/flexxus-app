import http from "http";
import app from "./server";
import { sequelize } from "./config/sequelize";
import { config } from "./config/config";


const PORT: number = config.port;

// Create Server
const server = http.createServer( app );

// Connection to the database
sequelize.authenticate()
  .then( () =>{
    console.info( "Connected to the database" );
    sequelize.sync( { force: false } );
  } )
  .then( () => {
    console.info( "Synchronized tables" );
  } )
  .catch( ( error: Error ) => {
    console.info( "An error occurred while connecting to the database: ", error );
  } );


server.listen( PORT, () => {
  console.log( `Server is running on port ${PORT}` );
} );