import http from "http";
import app from "./server";
import { config } from "./config/config";


const PORT: number = config.port;

// Create Server
const server = http.createServer( app );


server.listen( PORT, () => {
  console.log( `Server is running on port ${PORT}` );
} );