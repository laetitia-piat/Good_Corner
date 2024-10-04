import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler, useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export type Inputs = {
  title: string;
  owner: string;
  price: number;
  description: string;
  email: string;
  picture: string;
  location: string;
  category: string;
  createdAt: string;
  tags: number[];
};
export type category = {
  id: number;
  name: string;
};
export type Tags = {
  id: number;
  name: string;
};

const NewAdForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<category[]>([]);
  const [tags, setTags] = useState([] as Tags[]);
  useEffect(() => {
    const fetchTags = async () => {
      const result = await axios.get<Tags[]>("http://localhost:3000/tags/");
      setTags(result.data);
    };
    const fetchCategory = async () => {
      const resultCat = await axios.get<category[]>(
        "http://localhost:3000/categories/"
      );
      setCategories(resultCat.data);
    };
    fetchTags();
    fetchCategory();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataForBackend = {
      ...data,
      tags: data.tags.map((el) => ({ id: el })),
    };
    try {
      await axios.post("http://localhost:3000/ads", dataForBackend);
      toast.success("Ad has been added", { position: "top-center" });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("An error occured");
    }
  };
  return (
    <>
      <form className="form-new-ad" onSubmit={handleSubmit(onSubmit)}>
        <label>Titre</label>
        <input
          className="text-field"
          type="text"
          placeholder="Titre"
          {...register("title", { required: true, min: 1, maxLength: 50 })}
        />

        <label>Description</label>
        <input
          className="text-field"
          type="text"
          placeholder="Description"
          {...register("description", { min: 1, maxLength: 150 })}
        />
        <label>Nom</label>
        <input
          className="text-field"
          type="text"
          placeholder="Nom"
          {...register("owner", { required: true, maxLength: 80 })}
        />
        <label>Email</label>
        <input
          className="text-field"
          type="text"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <label>Date</label>
        <input
          className="text-field"
          type="date"
          placeholder="Date"
          {...register("createdAt", {})}
        />
        <label>Prix</label>
        <input
          className="text-field"
          type="number"
          placeholder="Prix"
          {...register("price", {})}
        />
        <label>Ville</label>
        <input
          className="text-field"
          type="text"
          placeholder="Ville"
          {...register("location", {})}
        />
        <label>Image</label>
        <input
          className="text-field"
          type="url"
          placeholder="Image"
          {...register("picture", {})}
        />
        <label>Categorie</label>
        <select className="text-field" {...register("category")}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />
        <label>Tags :</label>
        <br />
        {tags.map((el) => (
          <Fragment key={el.id}>
            <label>
              <input type="checkbox" value={el.id} {...register("tags")} />
              {el.name}
            </label>
            <br />
          </Fragment>
        ))}
        <input type="submit" className="button button-primary" />
      </form>
    </>
  );
};

export default NewAdForm;
