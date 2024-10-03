import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ButtonDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <button
      className="button button-primary"
      onClick={async () => {
        try {
          {
            await axios.delete(`http://localhost:3000/ads/${id}`);
          }
          toast.success("Annonce supprimée avec succès!", {
            position: "top-center",
          });
          navigate("/");
        } catch (err) {
          console.log(err);
          toast.error("An error occured");
        }
      }}
    >
      Supprimer
    </button>
  );
};

export default ButtonDelete;
