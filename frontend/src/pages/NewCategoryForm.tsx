import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateNewCategoryMutation } from "../generated/graphql-types"; // Assurez-vous que ce hook existe et est généré.

const NewCategoryFormPage = () => {
  const navigate = useNavigate();
  const [createNewCategory, { loading }] = useCreateNewCategoryMutation(); // Hook pour la mutation

  const notify = () =>
    toast.success("Catégorie ajoutée avec succès !", {
      position: "top-center",
    });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          // Récupérer les données du formulaire
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);

          // Convertir les données du formulaire en objet JSON
          const formJson = Object.fromEntries(formData.entries());

          // Exécuter la mutation GraphQL
          const { data } = await createNewCategory({
            variables: {
              data: {
                name: formJson.name as string, // Assurez-vous que la clé correspond au schéma GraphQL
              },
            },
          });

          if (data?.createNewCategory?.id) {
            notify(); // Notifier en cas de succès
            navigate("/"); // Rediriger l'utilisateur
          } else {
            throw new Error("Création de la catégorie échouée.");
          }
        } catch (err) {
          console.error(err);
          toast.error(
            "Une erreur s'est produite lors de l'ajout de la catégorie."
          );
        }
      }}
    >
      <label>
        Titre de la catégorie:
        <br />
        <input className="text-field" type="text" name="name" required />
      </label>
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Chargement..." : "Submit"}
      </button>
      <ToastContainer />
    </form>
  );
};

export default NewCategoryFormPage;
