import axios from "axios";
import { useEffect, useState } from "react";

type category = {
  id: number;
  name: string;
};

const NewAdForm = () => {
  const [categories, setCategories] = useState<category[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const resultCat = await axios.get<category[]>(
        "http://localhost:3000/categories/"
      );
      setCategories(resultCat.data);
    };
    fetchCategory();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);

        const formJson = Object.fromEntries(formData.entries());
        axios.post("http://localhost:3000/ads/", formJson);
      }}
    >
      <label>
        Titre de l'annonce:
        <br />
        <input className="text-field" name="title" />
      </label>
      <br />
      <label>
        Description :
        <br />
        <input className="text-field" name="description" />
      </label>
      <br />
      <label>
        Prix :
        <br />
        <input className="text-field" name="price" />
      </label>
      <br />
      <label>
        Mail :
        <br />
        <input className="text-field" name="owner" />
      </label>
      <br />
      <label>
        Ville :
        <br />
        <input className="text-field" name="location" />
      </label>
      <br />
      <label>
        Date :
        <br />
        <input type="date" className="text-field" name="createdAt" />
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
        <select className="text-field" name="category">
          {categories.map((el) => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </label>
      <button className="button">Submit</button>
    </form>
  );
};

export default NewAdForm;
