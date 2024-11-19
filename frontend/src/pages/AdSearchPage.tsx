import { useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import { useGetAdsByKeyWordQuery } from "../generated/graphql-types";

const AdSearchPage = () => {
  const { keyword } = useParams();
  const { loading, error, data } = useGetAdsByKeyWordQuery({
    variables: {
      title: keyword,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  console.log(data);

  return (
    <div>
      <h2>Search results for keyword: {keyword}</h2>
      <section className="recent-ads">
        {data?.getAdsByKeyWord.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              title={ad.title}
              pictures={ad.pictures[0]?.url}
              price={ad.price}
              link={`../../ad/${ad.id}`}
              category={{
                name: `${ad.category?.name}`,
              }}
              tags={[]}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdSearchPage;
