import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import AdCardDetails from "../components/AdCardDetails";
import { AdCardProps } from "../components/AdCardDetails";
import ButtonDelete from "../components/ButtonDelete";

const AdDetails = () => {
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState({} as AdCardProps);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/ads/${id}`);
      console.log(result);
      setAdDetails(result.data);
    };
    fetchData();
  }, [id]);

  //   const AdDetails = gql`
  //   {
  //   getAllAds {
  //     id
  //     title
  //     description
  //     owner
  //     email
  //     price
  //     picture
  //     location
  //     createdAt
  //   }

  // `;
  //   console.log(AdDetails);

  //    export default function App() {
  //      const { data, isLoading, error } = useQuery("getAllAds", () => {
  //        console.log(data)
  //        return(AdDetails);
  //      });

  //   //   if (isLoading) return "Loading...";
  //   //   if (error) return <pre>{error.message}</pre>;
  //   // }
  return (
    <>
      <Header />
      <AdCardDetails
        key={id}
        title={adDetails.title}
        picture={adDetails.picture}
        description={adDetails.description}
        owner={adDetails.owner}
        email={adDetails.email}
        price={adDetails.price}
        link={adDetails.link}
        createdAt={adDetails.createdAt}
        location={adDetails.location}
        id={adDetails.id}
        tags={[]}
      />
      <ButtonDelete />
    </>
  );
};

export default AdDetails;
