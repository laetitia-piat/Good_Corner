import AdCard from "./AdCard";
import { useState } from "react";
import { useGetAllAdsQuery } from "../generated/graphql-types";

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const { loading, error, data } = useGetAllAdsQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  console.log(data);

  if (data) {
    return (
      <>
        <h2>Annonces récentes</h2>
        <p>Prix total : {total}€ </p>
        <section className="recent-ads">
          {data.getAllAds.map((ad) => (
            <div key={ad.id}>
              <AdCard
                id={ad.id}
                pictures={ad.pictures[0]?.url}
                link={`ad/${ad.id}`}
                price={ad.price}
                title={ad.title}
                category={ad?.category}
                //tags={[]}
              />
              <button
                className="button button-tot"
                onClick={() => {
                  {
                    setTotal(total + ad.price);
                  }
                }}
              >
                Ajouter au total
              </button>
            </div>
          ))}
        </section>
      </>
    );
  }
};

export default RecentAds;
