import { Category } from "../entities/Category";
import { Field, ID, InputType } from "type-graphql";

@InputType()
class AdInput {
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
  email: string;

  @Field(() => [String], { nullable: true })
  picturesUrl?: string[];

  @Field(() => ID, { nullable: true })
  category: Category;

  @Field(() => [String], { nullable: true })
  tags: string[];
}

export default AdInput;
