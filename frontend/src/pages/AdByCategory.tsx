//import AdCard from "../components/AdCard";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "../components/AdCard";
import axios from "axios";

const AdbyCategory = () => {
  const { name } = useParams();
  console.log(name);
  const [ads, setAds] = useState<AdCardProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          `http://localhost:3000/ads?category=${name}`
        );
        console.log("resultat", result);
        setAds(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [name]);
  return (
    <>
      <Header />
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              picture={ad.picture}
              link={ad.link}
              price={ad.price}
              title={ad.title}
              category={{
                id: ad.category.id,
                name: `${ad.category.name}`,
              }}
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default AdbyCategory;
