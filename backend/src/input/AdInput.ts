import { Category } from "../entities/category";
import { Field, ID, InputType } from "type-graphql";
import { Picture } from "../entities/picture";
import { Tag } from "../entities/tag";
import { Ad } from "../entities/ad";

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
  price: number;

  @Field()
  location: string;

  @Field()
  createdAt: string;

  @Field(() => [PictureInput], { nullable: true })
  pictures?: Picture[];

  @Field(() => ID, { nullable: true })
  category: Category;

  @Field(() => [TagInput], { nullable: true })
  tags: Tag[];
  id: number;
}

export default AdInput;
