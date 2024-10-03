// import { Link } from "react-router-dom";
// import ButtonDelete from "./ButtonDelete";

export type AdCardProps = {
  id: number;
  title: string;
  picture: string;
  price: number;
  link: string;
  category: { id: number; name: string };
};

const AdCard = ({ link, picture, title, price, category }: AdCardProps) => (
  <div className="ad-card-container">
    <a className="ad-card-link" href={link}>
      <img className="ad-card-image" src={picture} />
      <div className="ad-card-text">
        <div className="ad-card-title">{title}</div>
        <div className="ad-card-price">{price}€</div>
        <div className="ad-card-category">{category.name}</div>
      </div>
      <div className="button-ad-card">
        {/* <Link to={`update`} className="button button-primary">
          Modifier
        </Link>
        <ButtonDelete /> */}
      </div>
    </a>
  </div>
);

export default AdCard;
