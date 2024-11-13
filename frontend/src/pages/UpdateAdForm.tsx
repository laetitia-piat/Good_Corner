import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdCardProps } from "../components/AdCardDetails";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { category, Inputs, Tags } from "./NewAdForm";

const UpdateAdForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<category[]>([]);
  const [tags, setTags] = useState([] as Tags[]);
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState({} as AdCardProps);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/ads/${id}`);
      console.log(result);
      setAdDetails(result.data);
    };
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
    fetchData();
    fetchCategory();
    fetchTags();
  }, [id]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataForBackend = {
      ...data,
      tags: data.tags.map((tag) => ({ id: tag })),
    };
    try {
      await axios.put(`http://localhost:3000/ads/${id}`, dataForBackend);
      toast.success("Annonce modifiée!", { position: "top-center" });
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
          defaultValue={adDetails.title}
          placeholder="Titre"
          {...register("title", { min: 1, maxLength: 50 })}
        />

        <label>Description</label>
        <input
          className="text-field"
          type="text"
          defaultValue={adDetails.description}
          placeholder="Description"
          {...register("description", { min: 1, maxLength: 150 })}
        />
        <label>Nom</label>
        <input
          className="text-field"
          defaultValue={adDetails.owner}
          type="text"
          placeholder="Nom"
          {...register("owner", { maxLength: 80 })}
        />
        <label>Email</label>
        <input
          className="text-field"
          defaultValue={adDetails.email}
          type="text"
          placeholder="Email"
          {...register("email", { pattern: /^\S+@\S+$/i })}
        />

        <label>Date</label>
        <input
          className="text-field"
          defaultValue={adDetails.createdAt}
          type="date"
          placeholder="Date"
          {...register("createdAt", {})}
        />
        <label>Prix</label>
        <input
          className="text-field"
          defaultValue={adDetails.price}
          type="number"
          placeholder="Prix"
          {...register("price", {})}
        />
        <label>Ville</label>
        <input
          className="text-field"
          defaultValue={adDetails.location}
          type="text"
          placeholder="Ville"
          {...register("location", {})}
        />
        <label>Image</label>
        <input
          className="text-field"
          defaultValue={adDetails.picture}
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
        {tags.map((tag) => (
          <Fragment key={tag.id}>
            <label>
              <input type="checkbox" value={tag.id} {...register("tags")} />
              {tag.name}
            </label>
            <br />
          </Fragment>
        ))}
        <input type="submit" className="button button-primary" />
      </form>
    </>
  );
};

export default UpdateAdForm;
