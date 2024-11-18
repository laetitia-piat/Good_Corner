import { Picture } from "../entities/Picture";
import { Field, InputType } from "type-graphql";

@InputType()
class PictureInput implements Partial<Picture> {
  @Field(() => String)
  url: string;

  @Field({ nullable: true })
  id?: number;
}

export default PictureInput;
