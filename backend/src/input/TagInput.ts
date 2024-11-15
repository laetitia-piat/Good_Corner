import { Tag } from "../entities/Tag";
import { Field, InputType } from "type-graphql";

@InputType()
class TagInput implements Partial<Tag> {
  @Field()
  name: string;
}

export default TagInput;
