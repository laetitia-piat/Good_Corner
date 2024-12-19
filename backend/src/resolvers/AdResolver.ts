import AdInput from "../input/AdInput";
import { Ad } from "../entities/Ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UpdateAdInput from "../input/UpdateAdInput";
import { Like } from "typeorm";

@Resolver(Ad)
class AdResolver {
  static Query: any;
  static Mutation: any;
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find({
      order: {
        id: "DESC",
        pictures: {
          id: "DESC",
        },
      },
    });
    return ads;
  }

  @Query(() => [Ad])
  async getAdsByKeyWord(
    @Arg("title", { nullable: true }) title?: string
  ): Promise<Ad[]> {
    try {
      let ads: Ad[];
      if (title) {
        ads = await Ad.find({
          where: {
            title: Like(`%${title}%`),
          },
          order: {
            id: "DESC",
            pictures: {
              id: "DESC",
            },
          },
          relations: { category: true, tags: true },
        });
      } else {
        ads = await Ad.find({ relations: { category: true, tags: true } });
      }
      return ads;
    } catch (error) {
      console.error("Erreur lors de la recherche des annonces :", error);
      throw new Error(
        "Une erreur est survenue lors de la récupération des annonces."
      );
    }
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    const ad = await Ad.findOne({
      where: { id: id },
      order: { pictures: { id: "DESC" } },
    });
    return ad;
  }

  @Query(() => [Ad])
  async getAdsByCategory(
    @Arg("categoryName") categoryName: string
  ): Promise<Ad[]> {
    const ads = await Ad.find({
      where: { category: { name: String(categoryName) } },
      relations: ["category"],
    });
    return ads;
  }

  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: AdInput) {
    const newAdToSave = Ad.create({
      ...newAdData,
    });
    const result = await newAdToSave.save();
    return result;
  }

  @Mutation(() => String)
  async updateAd(@Arg("data") updateAdData: UpdateAdInput) {
    let adToUpdate = await Ad.findOneByOrFail({ id: updateAdData.id });
    console.log("ad to update", adToUpdate);
    adToUpdate = Object.assign(adToUpdate, updateAdData);
    console.log("ad to update", adToUpdate);
    const result = await adToUpdate.save();
    console.log(result);
    return "Ad has been updated";
  }

  @Mutation(() => String)
  async deleteAdById(@Arg("id") id: number) {
    const result = await Ad.delete(id);
    console.log(result);
    return "Ad has been deleted";
  }
}

export default AdResolver;
