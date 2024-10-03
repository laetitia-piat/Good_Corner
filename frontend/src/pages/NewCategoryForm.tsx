import axios from "axios";

const NewCategoryFormPage = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        axios.post("http://localhost:3000/categories", formJson);
      }}
    >
      <label>
        Titre de la catégorie:
        <br />
        <input className="text-field" type="text" name="title" />
      </label>
      <button className="button">Submit</button>
    </form>
  );
};

export default NewCategoryFormPage;
