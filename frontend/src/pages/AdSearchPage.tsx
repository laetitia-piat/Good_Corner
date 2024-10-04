import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCard, { AdCardProps } from "../components/AdCard";

const AdSearchPage = () => {
  const { keyword } = useParams();
  const [ads, setAds] = useState<AdCardProps[]>([]);
  useEffect(() => {
    const fetchAdsForKeyword = async () => {
      const result = await axios.get(
        `http://localhost:3000/ads?title=${keyword}`
      );
      console.log("result", result);
      setAds(result.data);
    };
    fetchAdsForKeyword();
  }, [keyword]);
  return (
    <div>
      <h2>Search results for keyword: {keyword}</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              title={ad.title}
              picture={ad.picture}
              price={ad.price}
              link={`../../ad/${ad.id}`}
              category={{
                id: ad.category.id,
                name: `${ad.category.name}`,
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
