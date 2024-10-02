import { useEffect, useState } from "react";
import AllCategory, { CategoryProps } from "./AllCategory";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const resultCat = await axios.get<CategoryProps[]>(
          "http://localhost:3000/categories?name="
        );
        setCategories(resultCat.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchCategory();
  }, []);
  //
  return (
    <nav className="categories-navigation">
      {categories.map((category) => (
        <AllCategory
          name={category.name}
          link={`category/${category.name}`}
          key={category.id}
        />
      ))}
    </nav>
  );
};

export default CategoryList;
