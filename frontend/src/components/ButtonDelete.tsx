import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DELETE_AD } from "../GraphQL/Mutation";

const ButtonDelete: any = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [deleteAd] = useMutation(DELETE_AD);
  return (
    <button
      className="button button-primary"
      onClick={async () => {
        try {
          {
            await deleteAd({
              variables: { deleteAdByIdId: parseInt(id) },
            });
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
