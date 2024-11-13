import { Tag } from "../entities/tag";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Tag)
class TagResolver {
  @Query(() => [Tag])
  async getAllTags() {
    const Tags = await Tag.find({
      order: {
        id: "DESC",
      },
    });
    return Tags;
  }
  @Query(() => Tag)
  async getTagById(@Arg("id") id: number) {
    const tag = await Tag.findOneByOrFail({ id: id });
    return tag;
  }
}

export default TagResolver;
