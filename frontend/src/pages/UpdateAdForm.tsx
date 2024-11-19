import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Inputs } from "./NewAdForm";
import { AdByIdDetails, allAds } from "../GraphQL/Query";
import { useQuery } from "@apollo/client";
import {
  useGetAllCategoriesAndTagsQuery,
  useUpdateAdMutation,
} from "../generated/graphql-types";

const UpdateAdForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, data } = useQuery(AdByIdDetails, {
    variables: { getAdByIdId: Number(id) },
  });

  const {
    loading: loadingCatTag,
    error: errorCatTag,
    data: dataCatTag,
  } = useGetAllCategoriesAndTagsQuery();

  const [updateAd] = useUpdateAdMutation({
    refetchQueries: [{ query: allAds }],
  });

  const {
    register,
    handleSubmit,
    //control,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "pictures",
  // });

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  if (loadingCatTag) return "Submitting...";
  if (errorCatTag) return `Submission error! ${errorCatTag.message}`;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataForBackend = {
      ...data,
      price: Number(data.price),
      id: Number(id),
      createdAt: data.createdAt + "T00:00:00.000Z",
      tags: data.tags ? data.tags.map((el) => ({ id: parseInt(el) })) : [],
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
  if (data && dataCatTag) {
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
          <br />
          {/* <button
            className="button-Add-Image"
            type="button"
            onClick={() => append({ url: "" })}
          >
            Add picture
          </button>
          <br />
          <div className="field">
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <section className="image-input-and-remove">
                    <input
                      className="text-field"
                      placeholder="Your image url"
                      {...register(`pictures.${index}.url` as const)}
                    />
                    <button className="button" onClick={() => remove(index)}>
                      -
                    </button>
                    <br />
                  </section>
                  <span>{errors.pictures?.[index]?.url?.message}</span>
                </div>
              );
            })}
          </div> */}
          <label>Categorie</label>
          <select className="text-field" {...register("category")}>
            {dataCatTag.getAllCategories.map((category: any) => (
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
          <label>Tags :</label>
          <br />
          {dataCatTag?.getAllTags.map((tag) => (
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
  }
};

export default UpdateAdForm;
