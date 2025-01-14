import { Category } from "../entities/category";
import { Ad } from "../entities/ad";
import { Field, ID, InputType } from "type-graphql";
import { Tag } from "../entities/tag";
import { Picture } from "../entities/picture";
import { PictureInput, TagInput } from "./AdInput";

@InputType()
export class UpdateCategoryInput implements Partial<Category> {
  @Field()
  id: number;

  @Field()
  name: string;
}

@InputType()
export class UpdateTagInput implements Partial<Tag> {
  @Field()
  id: number;

  @Field()
  name: string;
}

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

  @Field(() => [PictureInput], { nullable: true })
  pictures?: Picture[];

  @Field(() => ID, { nullable: true })
  category: Category;

  @Field(() => [TagInput], { nullable: true })
  tags?: Tag[] | undefined;
}

export default UpdateAdInput;
