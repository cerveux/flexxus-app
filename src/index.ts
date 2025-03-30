import http from "http";
import app from "./server";
import { sequelize } from "./config/sequelize";
import { config } from "./config/config";


const PORT: number = config.port;

// Create Server
const server = http.createServer( app );

// Connection to the database
sequelize.authenticate();


server.listen( PORT, () => {
  console.log( `Server is running on port ${PORT}` );
} );