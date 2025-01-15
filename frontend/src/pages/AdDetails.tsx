import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import ButtonDelete from "../components/ButtonDelete";
import { useGetAdByIdQuery } from "../generated/graphql-types";
import { useState } from "react";

const AdDetails = () => {
  const { id }: any = useParams();
  const { loading, error, data } = useGetAdByIdQuery({
    variables: { getAdByIdId: parseInt(id) },
  });
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  console.log(data);
  if (data) {
    const mainImage = activeImage || data.getAdById.pictures[0]?.url;
    return (
      <>
        <Header />
        <div>
          <h2 className="ad-details-title">{data.getAdById.title}</h2>
          <section className="ad-details">
            <div className="ad-details-image-container">
              {/* Image principale */}
              <img
                className="ad-details-main-image"
                src={mainImage}
                alt="Main"
              />
              {/* Miniatures */}
              <div className="ad-details-thumbnails">
                {data.getAdById.pictures.map((picture: any, index: any) => (
                  <img
                    key={index}
                    className={`ad-details-thumbnail ${
                      picture.url === mainImage ? "active" : ""
                    }`}
                    src={picture.url}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setActiveImage(picture.url)} // Mettre à jour l'image principale
                  />
                ))}
              </div>
            </div>
            <div className="ad-details-info">
              <div className="ad-details-price">{data.getAdById.price}€</div>
              <div className="ad-details-description">
                {data.getAdById.description}
              </div>
              <hr className="separator" />
              <div className="ad-details-owner">
                Annoncée publiée par <b>{data.getAdById.user.email}</b>{" "}
                {new Date(data.getAdById.createdAt as string).toDateString()}.
              </div>
              <div className="ad-details-tags">
                {data?.getAdById.tags?.map((tag) => (
                  <div className="ad-tags">{tag.name}</div>
                ))}
              </div>
              <a
                href={`mailto:${data.getAdById.user.email}`}
                className="button button-primary link-button"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                  stroke="currentcolor"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
                </svg>
                Envoyer un email
              </a>
              <Link to={`update`} className="button button-primary link-button">
                Modifier
              </Link>
            </div>
          </section>
        </div>
        <ButtonDelete />
      </>
    );
  }
};

export default AdDetails;
