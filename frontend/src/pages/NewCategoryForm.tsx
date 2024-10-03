import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewCategoryFormPage = () => {
  const navigate = useNavigate();
  const notify = () =>
    toast.success("Categorie ajoutée avec succès !", {
      position: "top-center",
    });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          // Read the form data
          const form = e.target;
          const formData = new FormData(form as HTMLFormElement);

          // Or you can work with it as a plain object:
          const formJson = Object.fromEntries(formData.entries());
          await axios.post("http://localhost:3000/categories/", formJson);
          toast.success("Ad has been added", { position: "top-center" });
          navigate("/");
        } catch (err) {
          console.log(err);
          toast.error("An error occured");
        }
      }}
    >
      <label>
        Titre de la catégorie:
        <br />
        <input className="text-field" type="text" name="name" />
      </label>
      <button className="button" onClick={notify}>
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};

export default NewCategoryFormPage;
