import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import CreatableSelect from "react-select/creatable";
import { CREATE_NEW_AD } from "../GraphQL/Mutation";
import { allCategory } from "../GraphQL/Query";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment, useState } from "react";

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
  tags: { value: number; label: string }[];
};

const NewAdForm = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(allCategory);
  const [createNewAd] = useMutation(CREATE_NEW_AD);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues, // Ici, on utilise getValues directement
  } = useForm<Inputs>({ criteriaMode: "all" });

  // Liste des tags existants
  const [tagOptions, setTagOptions] = useState([
    { value: 1, label: "React" },
    { value: 2, label: "GraphQL" },
    { value: 3, label: "Apollo" },
  ]);

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
            tags: formData.tags.map((tag) => tag.value),
          },
        },
      });

      toast.success("Ad has been added", { position: "top-center" });
      navigate("/");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { position: "top-center" });
    }
  };

  const handleCreateTag = (inputValue: string) => {
    const newTag = { value: tagOptions.length + 1, label: inputValue };

    // Ajouter le nouveau tag à la liste des options
    setTagOptions((prev: any) => [...prev, newTag]);

    // Ajouter ce tag à la valeur actuelle du champ
    const currentTags = getValues("tags") || []; // Utilisation de getValues ici
    setValue("tags", [...currentTags, newTag]);
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

        <label>Tags</label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isMulti
              options={tagOptions}
              onChange={(selected) => field.onChange(selected)}
              onCreateOption={handleCreateTag}
              isClearable
              isSearchable
              placeholder="Add tags..."
            />
          )}
        />

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

        <input type="submit" className="button button-primary" />
      </form>
    </>
  );
};

export default NewAdForm;
