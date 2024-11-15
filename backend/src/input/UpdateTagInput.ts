import { Tag } from "../entities/Tag";
import { Field, InputType } from "type-graphql";

@InputType()
class UpdateTagInput implements Partial<Tag> {
  @Field()
  id: number;

  @Field()
  name: string;
}

export default UpdateTagInput;
