import { Link } from "react-router-dom";
import { Category, Picture } from "../generated/graphql-types";

export type AdCardProps = {
  __typename?: string;
  id: number;
  title: string;
  pictures: Picture[];
  price: number;
  category: Category;
  tags: [];
  link: string;
};

const AdCard = ({
  pictures,
  title,
  price,
  tags,
  category,
  id,
}: AdCardProps) => (
  <Link to={`/ad/${id}`} className="category-navigation-link">
    <div className="ad-card-container">
      <img className="ad-card-image" src={pictures?.at(0)?.url} />
      <div className="ad-card-text">
        <div className="ad-card-title">{title}</div>
        <div className="ad-card-price">{price}€</div>
        <div className="ad-card-category">{category?.name}</div>
        <div className="ad-card-tags">{tags}</div>
      </div>
      <div className="button-ad-card"></div>
    </div>
  </Link>
);

export default AdCard;
