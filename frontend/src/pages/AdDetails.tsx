import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import AdCardDetails from "../components/AdCardDetails";
import { AdCardProps } from "../components/AdCardDetails";

const AdDetails = () => {
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState({} as AdCardProps);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/ads/${id}`);
      setAdDetails(result.data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <AdCardDetails
        key={id}
        title={adDetails.title}
        picture={adDetails.picture}
        description={adDetails.description}
        price={adDetails.price}
        link={adDetails.link}
        createdAt={adDetails.createdAt}
        id={0}
      />
    </>
  );
};

export default AdDetails;
