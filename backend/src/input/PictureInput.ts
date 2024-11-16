import { Picture } from "../entities/Picture";
import { Field, InputType } from "type-graphql";

@InputType()
class PictureInput implements Partial<Picture> {
  @Field(() => String)
  static url: any;

  @Field({ nullable: true })
  id?: number;
}

export default PictureInput;
