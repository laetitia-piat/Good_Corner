import { Field, InputType } from "type-graphql";

@InputType()
class PictureInput {
  @Field()
  url: string;
}

export default PictureInput;
