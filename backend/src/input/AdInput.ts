import { Category } from "../entities/Category";
import { Field, ID, InputType } from "type-graphql";
import { Picture } from "../entities/Picture";
import { Tag } from "../entities/Tag";
import { Ad } from "../entities/Ad";

@InputType()
export class PictureInput implements Partial<Picture> {
  @Field()
  url: string;
}

@InputType()
export class TagInput {
  @Field()
  id: number;
}

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field()
  name: string;
}

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

  @Field(() => [PictureInput], { nullable: true })
  pictures?: Picture[];

  @Field(() => ID, { nullable: true })
  category: Category;

  @Field(() => [TagInput], { nullable: true })
  tags: Tag[];
  id: number;
}

export default AdInput;
