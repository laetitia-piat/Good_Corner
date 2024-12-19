import { useCreateNewAdMutation } from "../generated/graphql-types";
import { allAds } from "../GraphQL/Query";
import CreateOrUpdateAdForm from "../components/CreateOrUpdateAdForm";

const NewAdFormPage = () => {
  const [createNewAd] = useCreateNewAdMutation({
    refetchQueries: [allAds],
  });

  return (
    <CreateOrUpdateAdForm defaultValues={{}} submitToBackend={createNewAd} />
  );
};

export default NewAdFormPage;
