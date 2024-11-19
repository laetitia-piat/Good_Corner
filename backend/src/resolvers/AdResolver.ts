import AdInput from "../input/AdInput";
import { Ad } from "../entities/Ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UpdateAdInput from "../input/UpdateAdInput";
import { Picture } from "../entities/Picture";
import { Like } from "typeorm";

@Resolver(Ad)
class AdResolver {
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
  async updateAd(@Arg("data") updateData: UpdateAdInput) {
    // Récupérer l'annonce avec ses images actuelles
    const adToUpdate = await Ad.findOneOrFail({
      where: { id: updateData.id },
      relations: ["pictures"],
    });

    // Mise à jour des champs de l'annonce (hors images)
    Object.assign(adToUpdate, updateData);

    if (updateData.picturesUrl) {
      for (const url of updateData.picturesUrl) {
        const newPicture: any = new Picture();
        newPicture.url = url;
        newPicture.ad = adToUpdate; // Associer la photo à l'annonce
        await newPicture.save();
        adToUpdate.pictures.push(newPicture); // Ajouter la photo à la relation
      }
    }
    // Sauvegarder l'annonce mise à jour
    await adToUpdate.save();

    console.log("Ad updated with pictures:", adToUpdate);
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
