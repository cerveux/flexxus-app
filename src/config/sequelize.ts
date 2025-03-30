import { Sequelize } from "sequelize-typescript";
import { config } from "./config";
import { UserModel } from "../models";

export const sequelize = new Sequelize(
  {
    database: config.nameDatabase,
    username: config.userDatabase,
    password: config.passwordDatabase,
    host: config.hostDatabase,
    dialect: "mysql",
    logging: false,
    models: [UserModel],
    pool: {
      max: 50,
      min: 5,
      acquire: 60000,
      idle: 30000
    }
  }
);