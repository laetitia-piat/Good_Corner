import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_NEW_AD } from "../GraphQL/Mutation";
import { allCategory } from "../GraphQL/Query";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment } from "react/jsx-runtime";

export type Inputs = {
  title: string;
  owner: string;
  price: number;
  description: string;
  email: string;
  picturesUrl: string;
  location: string;
  category: string;
  createdAt: string;
  tags: number[];
};

const NewAdForm = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(allCategory);
  console.log("data", data);
  const [createNewAd] = useMutation(CREATE_NEW_AD);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      await createNewAd({
        variables: {
          data: {
            title: formData.title,
            owner: formData.owner,
            price: Number(formData.price),
            description: formData.description,
            email: formData.email,
            picturesUrl: formData.picturesUrl,
            location: formData.location,
            category: formData.category,
            createdAt: formData.createdAt,
            tags: formData.tags,
          },
        },
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
        <input
          className="text-field"
          type="url"
          placeholder="Image"
          {...register("picturesUrl", {})}
        />
        <label>Categorie</label>
        <select className="text-field" {...register("category")}>
          {data.getAllCategories.map((category: any) => (
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
        {/* <label>Tags :</label>
        <br />
        {tags.map((el) => (
          <Fragment key={el.id}>
            <label>
              <input type="checkbox" value={el.id} {...register("tags")} />
              {el.name}
            </label>
            <br />
          </Fragment>
        ))} */}
        <input type="submit" className="button button-primary" />
      </form>
    </>
  );
};

export default NewAdForm;
