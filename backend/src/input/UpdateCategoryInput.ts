import { Category } from "../entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
class UpdateCategoryInput implements Partial<Category> {
  @Field()
  id: number;

  @Field()
  name: string;
}

export default UpdateCategoryInput;
