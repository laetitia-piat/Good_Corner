import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { Field, ID, InputType } from "type-graphql";
//import { Tag } from "../entities/Tag";
//import { Picture } from "../entities/Picture";

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
  email: string;

  @Field(() => [String], { nullable: true })
  picturesUrl?: string[];

  @Field(() => ID, { nullable: true })
  category: Category;

  @Field(() => [ID], { nullable: true })
  tagName?: string[];
}

export default AdInput;
