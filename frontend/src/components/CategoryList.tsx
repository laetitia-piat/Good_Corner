import { useQuery } from "@apollo/client";
import AllCategory from "./AllCategory";
import { allCategory } from "../GraphQL/Query";

const CategoryList = () => {
  const { loading, error, data } = useQuery(allCategory);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <nav className="categories-navigation">
      {data.getAllCategories.map((category: any) => (
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
