import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ButtonDelete = () => {
  const { id } = useParams();
  return (
    <Link to="/">
      <button
        className="button button-tot"
        onClick={() => {
          {
            axios.delete(`http://localhost:3000/ads/${id}`);
          }
        }}
      >
        Supprimer
      </button>
    </Link>
  );
};

export default ButtonDelete;
