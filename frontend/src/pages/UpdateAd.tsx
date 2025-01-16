import { useParams } from "react-router-dom";
import { useUpdateAdMutation } from "../generated/graphql-types";
import CreateOrUpdateAdForm from "../components/CreateOrUpdateAdForm";
import { AdByIdDetails, allAds } from "../GraphQL/Query";
import { useQuery } from "@apollo/client";

const UpdateAdPage = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(AdByIdDetails, {
    variables: { getAdByIdId: Number(id) },
  });
  const [updateAd] = useUpdateAdMutation({
    refetchQueries: [allAds],
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    console.log("data", data);
    return (
      <CreateOrUpdateAdForm
        defaultValues={{
          ...data.getAdById,
          category: data.getAdById?.category?.id,
          pictures: data.getAdById.pictures.map((picture: any) => ({
            url: picture.url,
          })),
          tags: data.tags
            ? data.tags.map((el: any) => ({ id: parseInt(el) }))
            : [],
        }}
        submitToBackend={updateAd}
      />
    );
  }
};
export default UpdateAdPage;
