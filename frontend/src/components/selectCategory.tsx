import axios from "axios";
import { useEffect, useState } from "react";

type category = {
  id: number;
  name: string;
};

const SelectCategory = () => {
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
    <select className="text-field" name="category">
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCategory;
