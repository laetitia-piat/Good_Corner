import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment } from "react/jsx-runtime";
import {
  useCreateNewAdMutation,
  useGetAllCategoriesAndTagsQuery,
} from "../generated/graphql-types";

export type Inputs = {
  title: string;
  owner: string;
  price: number;
  description: string;
  email: string;
  pictures: { url: string }[];
  location: string;
  category: string;
  createdAt: string;
  tags: string[];
};

const NewAdForm = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useGetAllCategoriesAndTagsQuery();
  const [createNewAd] = useCreateNewAdMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataForBackend = {
      ...data,
      price: Number(data.price),
      createdAt: data.createdAt + "T00:00:00.000Z",
      tags: data.tags ? data.tags.map((el) => ({ id: parseInt(el) })) : [],
    };
    console.log(dataForBackend);
    try {
      await createNewAd({
        variables: { data: dataForBackend },
      });

      toast.success("Ad has been added", { position: "top-center" });
      navigate("/");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { position: "top-center" });
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
        <br />
        <button
          className="button"
          type="button"
          onClick={() => append({ url: "" })}
        >
          +
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
        </div>

        <label>Categorie</label>
        <select className="text-field" {...register("category")}>
          {data?.getAllCategories.map((category: any) => (
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
        <section>
          <br />
          {data?.getAllTags.map((el: any) => (
            <Fragment key={el.id}>
              <label>
                <input type="checkbox" value={el.id} {...register("tags")} />
                {el.name}
              </label>
              <br />
            </Fragment>
          ))}
        </section>
        <input type="submit" className="button button-primary" />
      </form>
    </>
  );
};

export default NewAdForm;
