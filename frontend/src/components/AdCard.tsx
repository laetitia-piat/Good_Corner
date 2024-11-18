// import { Link } from "react-router-dom";
// import ButtonDelete from "./ButtonDelete";

import { Link } from "react-router-dom";

export type AdCardProps = {
  id: number;
  title: string;
  pictures: string;
  price: number;
  link: string;
  category: { name: string } | undefined | null;
  tags: [];
};

const AdCard = ({
  link,
  pictures,
  title,
  price,
  tags,
  category,
}: AdCardProps) => (
  <Link to={link} className="category-navigation-link">
    <div className="ad-card-container">
      <img className="ad-card-image" src={pictures} />
      <div className="ad-card-text">
        <div className="ad-card-title">{title}</div>
        <div className="ad-card-price">{price}€</div>
        <div className="ad-card-category">{category?.name}</div>
        <div className="ad-card-tags">{tags}</div>
      </div>
      <div className="button-ad-card">
        {/* <Link to={`update`} className="button button-primary">
          Modifier
        </Link>
        <ButtonDelete /> */}
      </div>
    </div>
  </Link>
);

export default AdCard;
