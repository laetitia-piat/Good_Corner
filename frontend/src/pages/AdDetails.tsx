import { useParams } from "react-router-dom";
import Header from "../components/Header";
import AdCardDetails from "../components/AdCardDetails";
import ButtonDelete from "../components/ButtonDelete";
import { useQuery } from "@apollo/client";
import { AdByIdDetails } from "../GraphQL/Query";

const AdDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(AdByIdDetails, {
    variables: { getAdByIdId: Number(id) },
  });
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  console.log(data);
  return (
    <>
      <Header />
      <AdCardDetails
        key={id}
        title={data.getAdById.title}
        picture={data.getAdById.pictures[0]?.url}
        description={data.getAdById.description}
        owner={data.getAdById.owner}
        email={data.getAdById.email}
        price={data.getAdById.price}
        link={data.getAdById.link}
        createdAt={data.getAdById.createdAt}
        location={data.getAdById.location}
        id={data.getAdById.id}
        //tags={[]}
      />
      <ButtonDelete />
    </>
  );
};

export default AdDetails;
