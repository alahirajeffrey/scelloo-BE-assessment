import { Sequelize } from "sequelize-typescript";
import { Product, User } from "../models";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: process.env.DB_USER || "scelloo_user",
  password: process.env.DB_PASS || "scelloo_pass",
  database: process.env.DB_NAME || "scelloo_db",
  models: [User, Product],
});
