import AdInput from "../input/AdInput";
import { Ad } from "../entities/Ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UpdateAdInput from "../input/UpdateAdInput";
import { Picture } from "../entities/Picture";
//import { Tag } from "../entities/Tag";

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
    const pictures: Picture[] = [];
    if (newAdData.picturesUrl) {
      newAdData.picturesUrl?.forEach((el) => {
        const newPicture = new Picture();
        newPicture.url = el;
        pictures.push(newPicture);
      });
    }
    // const tags: Tag[] = [];
    // if (newAdData.tagName) {
    //   newAdData.tagName?.forEach((el) => {
    //     const newTag = new Tag();
    //     newTag.name = el;
    //     tags.push(newTag);
    //   });
    // }
    const newAdToSave = Ad.create({ ...newAdData, pictures /* , tags */ });
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
