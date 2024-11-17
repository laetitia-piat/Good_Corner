import { useQuery } from "@apollo/client";
import AdCard from "./AdCard";
import { useState } from "react";
import { allAds } from "../GraphQL/Query";

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const { loading, error, data } = useQuery(allAds);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  console.log(data);
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total : {total}€ </p>
      <section className="recent-ads">
        {data.getAllAds.map((ad: any) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              pictures={ad.pictures[0]?.url}
              link={`ad/${ad.title}`}
              price={ad.price}
              title={ad.title}
              category={ad.category}
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
};

export default RecentAds;
