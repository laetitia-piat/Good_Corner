import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Inputs } from "./NewAdForm";
import { AdByIdDetails, allCategory } from "../GraphQL/Query";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_AD } from "../GraphQL/Mutation";

const UpdateAdForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, data } = useQuery(AdByIdDetails, {
    variables: { getAdByIdId: Number(id) },
  });
  const dataCategory = useQuery(allCategory);
  console.log({ dataCategory });
  const allCategories = dataCategory.data;
  console.log(allCategories);
  const [updateAd] = useMutation(UPDATE_AD);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataForBackend = {
      ...data,
      price: Number(data.price),
      id: Number(id),
      //picture: data.picturesUrl,
    };
    try {
      await updateAd({
        variables: { data: dataForBackend },
      });
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
          defaultValue={data.getAdById.title}
          placeholder="Titre"
          {...register("title", { min: 1, maxLength: 50 })}
        />

        <label>Description</label>
        <input
          className="text-field"
          type="text"
          defaultValue={data.getAdById.description}
          placeholder="Description"
          {...register("description", { min: 1, maxLength: 150 })}
        />
        <label>Nom</label>
        <input
          className="text-field"
          defaultValue={data.getAdById.owner}
          type="text"
          placeholder="Nom"
          {...register("owner", { maxLength: 80 })}
        />
        <label>Email</label>
        <input
          className="text-field"
          defaultValue={data.getAdById.email}
          type="text"
          placeholder="Email"
          {...register("email", { pattern: /^\S+@\S+$/i })}
        />

        <label>Date</label>
        <input
          className="text-field"
          defaultValue={data.getAdById.createdAt}
          type="date"
          placeholder="Date"
          {...register("createdAt", {})}
        />
        <label>Prix</label>
        <input
          className="text-field"
          defaultValue={data.getAdById.price}
          type="number"
          placeholder="Prix"
          {...register("price", {})}
        />
        <label>Ville</label>
        <input
          className="text-field"
          defaultValue={data.getAdById.location}
          type="text"
          placeholder="Ville"
          {...register("location", {})}
        />
        <label>Image</label>
        <input
          className="text-field"
          defaultValue={data.getAdById.pictures[0]?.url}
          type="url"
          placeholder="Image"
          {...register("picturesUrl", {})}
        />
        <label>Categorie</label>
        <select className="text-field" {...register("category")}>
          {allCategories.getAllCategories.map((category: any) => (
            <option
              key={category.id}
              value={category.id}
              //selected={data.getAdById.category.name}
            >
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
        {/* <label>Tags :</label>
        <br />
        {tags.map((tag) => (
          <Fragment key={tag.id}>
            <label>
              <input type="checkbox" value={tag.id} {...register("tags")} />
              {tag.name}
            </label>
            <br />
          </Fragment>
        ))} */}
        <input type="submit" className="button button-primary" />
      </form>
    </>
  );
};

export default UpdateAdForm;
