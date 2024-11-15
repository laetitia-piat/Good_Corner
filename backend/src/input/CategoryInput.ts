import { Category } from "src/entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
class CategoryInput implements Partial<Category> {
  @Field()
  name: string;
}

export default CategoryInput;
