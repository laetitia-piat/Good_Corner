import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdCardProps } from "../components/AdCardDetails";
import SelectCategory from "../components/selectCategory";
import { toast } from "react-toastify";

const UpdateAdForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState({} as AdCardProps);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/ads/${id}`);
      console.log(result);
      setAdDetails(result.data);
    };
    fetchData();
  }, [id]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        // Convertit les données du formulaire en un objet JSON
        const formJson = Object.fromEntries(formData.entries());
        try {
          // Envoyer une requête PUT pour mettre à jour l'annonce
          const response = await axios.put(
            `http://localhost:3000/ads/${id}`,
            formJson
          );
          console.log("Annonce mise à jour avec succès!", response.data);
          toast.success("Annonce mise à jour avec succès!", {
            position: "top-center",
          });
          navigate("/");
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'annonce:", error);
          toast.error("Erreur lors de la mise à jour de l'annonce!");
        }
      }}
    >
      <label>
        Titre de l'annonce:
        <br />
        <input
          className="text-field"
          name="title"
          defaultValue={adDetails.title}
        />
      </label>
      <br />
      <label>
        Description :
        <br />
        <input
          className="text-field"
          name="description"
          defaultValue={adDetails.description}
        />
      </label>
      <br />
      <label>
        Prix :
        <br />
        <input
          className="text-field"
          name="price"
          defaultValue={adDetails.price}
        />
      </label>
      <br />
      <label>
        Mail :
        <br />
        <input
          className="text-field"
          name="mail"
          defaultValue={adDetails.email}
        />
      </label>
      <br />
      <label>
        Ville :
        <br />
        <input
          className="text-field"
          name="location"
          defaultValue={adDetails.location}
        />
      </label>
      <br />
      <label>
        Date :
        <br />
        <input
          type="date"
          className="text-field"
          name="createdAt"
          //defaultValue={adDetails.createdAt.slice(0, 10)}
        />
      </label>
      <br />
      <label>
        Image :
        <br />
        <input
          className="text-field"
          name="picture"
          defaultValue={adDetails.picture}
        />
      </label>
      <br />
      <label>
        Catégorie :
        <br />
        <SelectCategory />
      </label>
      <br />
      <button className="button">Submit</button>
    </form>
  );
};

export default UpdateAdForm;
