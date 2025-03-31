import { config } from "dotenv";

config( {
  path: ".env.test"
} );

jest.mock( "./src/config/swagger", () => ( {
  __esModule: true, // This is necessary for handling ES modules
  default: jest.fn( ( _app, _port ) => {
  } ),
} ) );