import { Link } from "react-router-dom";

export type CategoryProps = {
  id?: number;
  name: string;
  link: string;
};

const AllCategory = ({ name, link }: CategoryProps) => (
  <>
    <Link to={link} className="category-link">
      {name}
    </Link>
  </>
);

export default AllCategory;
