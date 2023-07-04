import { DataSource } from "typeorm";
import { User } from "./Entities/User";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  logging: false,
  synchronize: true,
  entities: [User],
  ssl: false,
});
