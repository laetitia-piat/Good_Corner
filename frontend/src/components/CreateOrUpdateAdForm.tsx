import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { useGetAllCategoriesAndTagsQuery } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateOrUpdateAdForm = ({
  defaultValues,
  submitToBackend,
}: {
  defaultValues: object;
  submitToBackend: any;
}) => {
  const navigate = useNavigate();
  const { error, loading, data } = useGetAllCategoriesAndTagsQuery();
  type Inputs = {
    title: string;
    description: string;
    price: string;
    pictures: { url: string; __typename?: string }[];
    location: string;
    category: string;
    tags: string[];
    user?: { email: string; __typename?: string };
    __typename?: string;
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  watch("pictures");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    delete data.__typename;
    delete data.user;
    data.pictures = data.pictures.map((el) => ({
      url: el.url,
    }));
    const dataForBackend = {
      ...data,
      price: parseInt(data.price),
      tags: data.tags ? data.tags.map((el) => ({ id: parseInt(el) })) : [],
    };
    console.log(data);
    await submitToBackend({ variables: { data: dataForBackend } });
    toast.success("Succes");
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data) {
    return (
      <>
        <form className="form-new-ad" onSubmit={handleSubmit(onSubmit)}>
          <>
            <label>
              Titre de l'annonce:
              <br />
              <input
                className="text-field"
                {...register("title", {
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  required: "This field is required",
                })}
              />
            </label>
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
          </>
          <br />
          <>
            <label>
              Description:
              <br />
              <textarea
                className="text-field"
                {...register("description", {
                  minLength: { value: 10, message: "Minimum 10 characters" },
                  required: "This field is required",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="description"
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
          </>
          <br />
          <>
            <label>
              Prix :
              <br />
              <input
                type="number"
                className="text-field"
                {...register("price", {
                  min: { value: 0, message: "Minimum 0" },
                  required: "This field is required",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="price"
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
          </>
          <br />
          <>
            <br />
            <button
              className="button-Add-Image"
              type="button"
              onClick={() => append({ url: "" })}
            >
              Add Image
            </button>
            <br />
            <div className="field-image-input-and-remove">
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <section className="image-input-and-remove">
                      {getValues(`pictures.${index}.url`) ? (
                        <img src={getValues(`pictures.${index}.url`)} />
                      ) : (
                        <input
                          id="file"
                          type="file"
                          className="text-field"
                          onChange={async (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.files) {
                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              try {
                                const result = await axios.post(
                                  "/img",
                                  formData
                                );
                                setValue(
                                  `pictures.${index}.url`,
                                  result.data.filename
                                );
                              } catch (error) {
                                console.error(error);
                              }
                            }
                          }}
                        />
                      )}

                      <input
                        className="text-field"
                        placeholder="Your image url"
                        {...register(`pictures.${index}.url` as const)}
                        type="hidden"
                      />
                      <button className="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                      <br />
                    </section>
                    <span>{errors.pictures?.[index]?.url?.message}</span>
                  </div>
                );
              })}
            </div>
          </>
          <br />
          <>
            <label>
              Ville :
              <br />
              <input
                className="text-field"
                {...register("location", {
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  required: "This field is required",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="location"
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
          </>
          <br />
          <>
            <label>
              <br />
              Category :
              <br />
              <select className="text-field" {...register("category")}>
                {data.getAllCategories.map((el: any) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </label>
            <ErrorMessage
              errors={errors}
              name="category"
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
          </>
          <br />
          <label>
            <br />
            Tags :
            <br />
            <div className="text-field">
              <>
                {data.getAllTags.map((tag: any) => (
                  <label key={tag.id}>
                    <input
                      type="checkbox"
                      value={tag.id}
                      {...register("tags")}
                    />
                    {tag.name}
                  </label>
                ))}
              </>
            </div>
          </label>
          <input type="submit" className="button" id="validate" />
        </form>
      </>
    );
  }
};

export default CreateOrUpdateAdForm;
