import AdCard from "./AdCard";
import { Category, useGetAllAdsQuery } from "../generated/graphql-types";

const RecentAds = () => {
  const { loading, error, data } = useGetAllAdsQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  if (data) {
    return (
      <>
        <h2>Annonces récentes</h2>
        <section className="recent-ads">
          {data.getAllAds.map((ad) => (
            <div key={ad.id}>
              <AdCard
                id={ad.id}
                pictures={ad.pictures[0]?.url}
                link={`ad/${ad.id}`}
                price={ad.price}
                title={ad.title}
                category={ad.category as Category}
                tags={[]} //tags={[ad?.tags]}
              />
            </div>
          ))}
        </section>
      </>
    );
  }
};

export default RecentAds;
