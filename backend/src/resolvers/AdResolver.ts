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
    const ad = await Ad.findOneByOrFail({ id });
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
    let adToUpdate = await Ad.findOneByOrFail({ id: updateData.id });
    adToUpdate = Object.assign(adToUpdate, updateData);
    // const pictures: Picture[] = [];
    // if (updateData.picturesUrl) {
    //   updateData.picturesUrl?.forEach((el) => {
    //     const newPicture = new Picture();
    //     newPicture.url = el;
    //     pictures.push(newPicture);
    //   });
    // }
    const result = await adToUpdate.save();
    console.log(result);
    return "Ad has been updated";
  }

  // @Mutation(() => String)
  // async updateAd(@Arg("data") updateData: UpdateAdInput) {
  //   // Récupérer l'annonce avec ses images actuelles
  //   const adToUpdate = await Ad.findOneOrFail({
  //     where: { id: updateData.id },
  //     relations: ["pictures"],
  //   });

  //   // Mise à jour des champs de l'annonce (hors images)
  //   Object.assign(adToUpdate, updateData);

  //   // Si des nouvelles URLs sont fournies
  //   if (updateData.picturesUrl) {
  //     // Supprimer les anciennes images
  //     if (adToUpdate.pictures && adToUpdate.pictures.length > 0) {
  //       await Picture.remove(adToUpdate.pictures);
  //     }

  //     // Créer de nouvelles images
  //     const newPictures = updateData.picturesUrl.map((url) => {
  //       const picture = new Picture();
  //       picture.url = url;
  //       picture.ad = adToUpdate; // Lier l'image à l'annonce
  //       return picture;
  //     });

  //     // Sauvegarder les nouvelles images
  //     await Picture.save(newPictures);
  //   }

  //   // Sauvegarder l'annonce mise à jour
  //   await adToUpdate.save();

  //   console.log("Ad updated with pictures:", adToUpdate);
  //   return "Ad has been updated";
  // }

  @Mutation(() => String)
  async deleteAdById(@Arg("id") id: number) {
    const result = await Ad.delete(id);
    console.log(result);
    return "Ad has been deleted";
  }
}

export default AdResolver;
