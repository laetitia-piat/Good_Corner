import express from "express";
import "reflect-metadata";
import cors from "cors";
import { dataSourceGoodCorner } from "./config/db";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { validate } from "class-validator";
import { Tag } from "./entities/Tag";
import { Like } from "typeorm";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//APP.GET
app.get("/", (_req, res) => {
  res.send("Hello World!!");
});

app.get("/ads", async (req, res) => {
  let ads: Ad[];
  if (req.query.category) {
    ads = await Ad.find({
      where: {
        category: { name: req.query.category as string },
      },
      relations: { category: true },
    });
  } else if (req.query.tags) {
    ads = await Ad.find({
      where: {
        tags: { name: req.query.tags as string },
      },
      relations: { tags: true },
    });
  } else if (req.query.title) {
    ads = await Ad.find({
      where: {
        title: Like(`%${req.query.title as string}%`),
      },
      relations: { category: true },
    });
  } else {
    ads = await Ad.find({ relations: { category: true, tags: true } });
  }
  res.send(ads);
});

app.get("/ads/:id", async (req, res) => {
  try {
    const result = await Ad.findOneByOrFail({ id: parseInt(req.params.id) });
    res.send(result);
  } catch (err) {
    console.log("error", err);
    res.status(400).send(err);
  }
});

app.get("/categories", async (req, res) => {
  let categories: Category[];
  if (req.query.name) {
    categories = await Category.find({
      where: {
        name: Like(`${req.query.name as string}%`),
      },
    });
  } else {
    categories = await Category.find();
  }
  res.send(categories);
});

// app.get("/categories/:name", async (req, res) => {
//   try {
//     const result = await Category.findOneByOrFail({ name: req.params.name });
//     res.send(result);
//   } catch (err) {
//     console.log("error", err);
//     res.status(400).send(err);
//   }
// });

app.get("/tags", async (req, res) => {
  let tags: Tag[];
  if (req.query.name) {
    tags = await Tag.find({
      where: {
        name: Like(`${req.query.name as string}%`),
      },
    });
  } else {
    tags = await Tag.find();
  }
  res.send(tags);
});

//APP.POST
app.post("/ads", async (req, res) => {
  console.log("request body", req.body.tags);
  const adToSave = new Ad();
  adToSave.createdAt = req.body.createdAt;
  adToSave.description = req.body.description;
  adToSave.location = req.body.location;
  adToSave.owner = req.body.owner;
  //adToSave.picture = req.body.picture;
  adToSave.price = req.body.price;
  adToSave.title = req.body.title;
  adToSave.email = req.body.email;
  adToSave.category = req.body.category ? req.body.category : 4;
  adToSave.tags = req.body.tags;

  const errors = await validate(adToSave);
  if (errors.length > 0) {
    console.log(errors);
    // throw new Error("Validation failed");
    res.status(400).send("Invalid input");
  } else {
    const result = await adToSave.save();
    res.send(result);
  }
});

app.post("/categories", async (req, res) => {
  const categoriesToSave = new Category();
  categoriesToSave.name = req.body.name;

  const errors = await validate(categoriesToSave);
  if (errors.length > 0) {
    console.log(errors);
    // throw new Error("Validation failed");
    res.status(400).send("Invalid input");
  } else {
    const result = await categoriesToSave.save();
    res.send(result);
  }
});

app.post("/tags", async (req, res) => {
  const tagsToSave = new Tag();
  tagsToSave.name = req.body.name;

  const errors = await validate(tagsToSave);
  if (errors.length > 0) {
    console.log(errors);
    // throw new Error("Validation failed");
    res.status(400).send("Invalid input");
  } else {
    const result = await tagsToSave.save();
    res.send(result);
  }
});

//APP.DELETE
app.delete("/ads/:id", async (req, res) => {
  const result = await Ad.delete(req.params.id);
  res.send(result);
});

app.delete("/tags/:id", async (req, res) => {
  const result = await Tag.delete(req.params.id);
  res.send(result);
});

app.delete("/categories/:id", async (req, res) => {
  const result = await Category.delete(req.params.id);
  res.send(result);
});

//APP.PUT
app.put("/ads/:id", async (req, res) => {
  try {
    let adToUpdate = await Ad.findOneByOrFail({ id: parseInt(req.params.id) });
    adToUpdate = Object.assign(adToUpdate, req.body);
    const result = await adToUpdate.save();
    console.log(result);
    res.send("Ad has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});
