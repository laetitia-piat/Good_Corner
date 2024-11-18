import { Category } from "../entities/Category";
import { Field, ID, InputType } from "type-graphql";
import { Picture } from "../entities/Picture";

@InputType()
class PictureInput {
  @Field()
  url: string;
}

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

  @Field(() => [PictureInput], { nullable: true })
  picturesUrl?: Picture[];

  @Field(() => ID, { nullable: true })
  category: Category;

  @Field(() => [String], { nullable: true })
  tags: string[];
}

export default AdInput;
