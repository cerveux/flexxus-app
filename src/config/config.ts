import dotenv from "dotenv";

dotenv.config();

 interface InterfaceConfig {
   port: number;
   hostDatabase: string | undefined;
   nameDatabase: string | undefined;
   userDatabase: string | undefined;
   passwordDatabase: string | undefined;
 }



export const config: InterfaceConfig = {
  port: Number( process.env.PORT )  || 4000,
  hostDatabase: process.env.HOST_DATABASE,
  nameDatabase: process.env.NAME_DATABASE,
  userDatabase: process.env.USER_DATABASE,
  passwordDatabase: process.env.PASSWORD_DATABASE,
};