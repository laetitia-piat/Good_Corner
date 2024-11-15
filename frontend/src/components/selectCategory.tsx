import { useQuery } from "@apollo/client";
import { allCategory } from "../GraphQL/Query";

const SelectCategory = () => {
  const { loading, error, data } = useQuery(allCategory);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <select className="text-field" name="category">
      {data.getAllCategories.map((category: any) => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCategory;
