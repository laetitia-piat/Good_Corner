import AdInput from "../input/AdInput";
import { Ad } from "../entities/ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find({
      order: {
        id: "DESC",
      },
    });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    const ad = await Ad.findOneByOrFail({ id: id });
    return ad;
  }

  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: AdInput) {
    const adToSave = new Ad();
    adToSave.createdAt = newAdData.createdAt;
    adToSave.description = newAdData.description;
    adToSave.location = newAdData.location;
    adToSave.owner = newAdData.owner;
    adToSave.price = newAdData.price;
    adToSave.title = newAdData.title;
    //adToSave.picture = newAdData.picture;
    adToSave.category = newAdData.category;

    const result = await adToSave.save();
    return result;
  }

  @Mutation(() => Ad)
  async deleteAdById(@Arg("id") id: number) {
    const result = await Ad.delete({ id: id });
    console.log(result);
    return result;
  }
}

export default AdResolver;
