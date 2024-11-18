import { useGetAllCategoryQuery } from "../generated/graphql-types";

const SelectCategory = () => {
  const { loading, error, data } = useGetAllCategoryQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  if (data) {
    return (
      <select className="text-field" name="category">
        {data.getAllCategories.map((category: any) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    );
  }
};

export default SelectCategory;
