import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DELETE_AD } from "../GraphQL/Mutation";
import { allAds } from "../GraphQL/Query";

const ButtonDelete: any = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [deleteAd] = useMutation(DELETE_AD, {
    refetchQueries: [{ query: allAds }], // Recharge les annonces après la suppression
  });
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
