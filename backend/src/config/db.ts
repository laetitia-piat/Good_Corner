import { Category } from "../entities/category";
import { Ad } from "../entities/ad";
import { DataSource } from "typeorm";
import { Tag } from "../entities/tag";

export const dataSourceGoodCorner = new DataSource({
  database: "good_corner.sqlite",
  type: "sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: ["error", "query"],
});