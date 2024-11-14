import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { DataSource } from "typeorm";
import { Tag } from "../entities/tag";

export const dataSourceGoodCorner = new DataSource({
  database: "good_corner.sqlite",
  type: "sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: ["error", "query"],
});
