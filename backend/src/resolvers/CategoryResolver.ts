import { Category } from "../entities/category";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Category)
class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories() {
    const Categories = await Category.find({
      order: {
        id: "DESC",
      },
    });
    return Categories;
  }
  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number) {
    const category = await Category.findOneByOrFail({ id: id });
    return category;
  }
}

export default CategoryResolver;
