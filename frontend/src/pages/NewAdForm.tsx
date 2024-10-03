import axios from "axios";
import SelectCategory from "../components/selectCategory";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewAdForm = () => {
  const navigate = useNavigate();
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
          await axios.post("http://localhost:3000/ads", formJson);
          toast.success("Ad has been added", { position: "top-center" });
          navigate("/");
        } catch (err) {
          console.log(err);
          toast.error("An error occured");
        }
      }}
    >
      <label>
        Titre de l'annonce:
        <br />
        <input className="text-field" type="text" name="title" />
      </label>
      <br />
      <label>
        Description :
        <br />
        <input className="text-field" type="text" name="description" />
      </label>
      <br />
      <label>
        Prix :
        <br />
        <input className="text-field" name="price" />
      </label>
      <br />
      <label>
        Nom :
        <br />
        <input className="text-field" type="text" name="owner" />
      </label>
      <br />
      <label>
        Ville :
        <br />
        <input className="text-field" type="text" name="location" />
      </label>
      <br />
      <label>
        Date :
        <br />
        <input type="date" className="text-field" name="createdAt" />
      </label>
      <br />
      <label>
        Email :
        <br />
        <input className="text-field" type="text" name="email" />
      </label>
      <br />
      <label>
        Image :
        <br />
        <input className="text-field" name="picture" />
      </label>
      <br />
      <label>
        Catégorie :
        <br />
        <SelectCategory />
      </label>
      {/* <form method="get" action="/"> */}
      <button className="button">Submit</button>
      {/* </form> */}
    </form>
  );
};

export default NewAdForm;
