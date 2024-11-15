import CategoryInput from "../input/CategoryInput";
import { Category } from "../entities/Category";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UpdateCategoryInput from "../input/UpdateCategoryInput";

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

  @Mutation(() => Category)
  async createNewCategory(@Arg("data") newAdData: CategoryInput) {
    const categoryToSave = new Category();
    categoryToSave.name = newAdData.name;

    const result = await categoryToSave.save();
    return result;
  }

  @Mutation(() => String)
  async updateCategory(@Arg("data") updateData: UpdateCategoryInput) {
    let categoryToUpdate = await Category.findOneByOrFail({
      id: updateData.id,
    });
    categoryToUpdate = Object.assign(categoryToUpdate, updateData);
    const result = await categoryToUpdate.save();
    console.log(result);
    return "Category has been updated";
  }

  @Mutation(() => String)
  async deleteCategory(@Arg("id") id: number) {
    const result = await Category.delete(id);
    console.log(result);
    return "Category has been deleted";
  }
}

export default CategoryResolver;
