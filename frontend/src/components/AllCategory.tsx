export type CategoryProps = {
  id?: number;
  name: string;
  link: string;
};

const AllCategory = ({ name, link }: CategoryProps) => (
  <>
    <a href={link} className="category-navigation-link">
      {name}
    </a>
  </>
);

export default AllCategory;
