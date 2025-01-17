import { Category } from "../entities/category";
import { Ad } from "../entities/ad";
import { DataSource } from "typeorm";
import { Tag } from "../entities/tag";
import { Picture } from "../entities/picture";
import { User } from "../entities/user";
import { TempUser } from "../entities/tempUser";
import { ForgotPassword } from "../entities/forgotPassword";

export const dataSourceGoodCorner = new DataSource({
  type: "postgres",
  host: "db",
  username: "postgres",
  database: "postgres",
  password: "example",
  entities: [Ad, Category, Tag, Picture, User, TempUser, ForgotPassword],
  synchronize: true,
  logging: ["error", "query"],
});
