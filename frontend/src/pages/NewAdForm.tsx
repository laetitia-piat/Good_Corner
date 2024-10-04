import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler, useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import SelectCategory from "../components/SelectCategory";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Inputs = {
  title: string;
  owner: string;
  price: number;
  description: string;
  email: string;
  picture: string;
  location: string;
  category: string;
  createdAt: string;
  tag: number;
};

const NewFormTest = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post("http://localhost:3000/ads", data);
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
        <SelectCategory />
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
        <input type="submit" />
      </form>
    </>
  );
};

export default NewFormTest;
