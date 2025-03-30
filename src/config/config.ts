import dotenv from "dotenv";

dotenv.config();

interface InterfaceConfig {
  port: number;
}



export const config: InterfaceConfig = {
  port: Number( process.env.PORT )  || 4000,
};
