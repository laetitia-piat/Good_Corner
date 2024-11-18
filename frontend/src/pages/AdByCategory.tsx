import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useQuery } from "@apollo/client";
import AdCard from "../components/AdCard";
import { byCategory } from "../GraphQL/Query";

const AdbyCategory = () => {
  const { name } = useParams();
  const { loading, error, data } = useQuery(byCategory, {
    variables: { categoryName: name },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  console.log(data);
  return (
    <>
      <Header />
      <section className="recent-ads">
        {data.getAdsByCategory.map((ad: any) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              pictures={ad.pictures[0]?.url}
              link={`../../ad/${ad.id}`}
              price={ad.price}
              title={ad.title}
              category={{
                name: `${ad.category.name}`,
              }}
              // tags={{
              //   id: ad.tags.id,
              //   name: `${ad.tags.name}`,
              // }}
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default AdbyCategory;
