import { Category } from "../entities/Category";
import { Ad } from "../entities/ad";
import { Field, ID, InputType } from "type-graphql";

@InputType()
class AdInput implements Partial<Ad> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  location: string;

  @Field()
  createdAt: string;

  @Field()
  picture: string;

  @Field(() => ID)
  category: Category;
}

export default AdInput;
