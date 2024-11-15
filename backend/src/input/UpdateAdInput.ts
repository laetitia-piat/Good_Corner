import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { Field, ID, InputType } from "type-graphql";
import { Tag } from "../entities/Tag";
//import { Picture } from "../entities/Picture";

@InputType()
class UpdateAdInput implements Partial<Ad> {
  @Field()
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  owner: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  createdAt: string;

  @Field({ nullable: true })
  email: string;

  @Field(() => [String], { nullable: true })
  picturesUrl?: string[];

  @Field(() => ID, { nullable: true })
  category: Category;

  @Field(() => [ID], { nullable: true })
  tags?: Tag[] | undefined;
}

export default UpdateAdInput;
