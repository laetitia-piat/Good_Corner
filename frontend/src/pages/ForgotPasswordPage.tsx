import { SubmitHandler, useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  type Inputs = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    forgotPassword({
      variables: { userEmail: data.email },
      onCompleted: () => {
        navigate("/changePassword");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
        <h1>Entrez votre email</h1>
        <input
          className="text-field"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input className="button" type="submit"></input>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
