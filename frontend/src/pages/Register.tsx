import { SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerMutation] = useRegisterMutation();
  type Inputs = {
    login: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registerMutation({
      variables: { data: { email: data.login, password: data.password } },
      onCompleted: (result) => {
        console.log(result);
        navigate("/confirm");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
        <h1>Page d'inscription</h1>
        <input
          className="text-field"
          placeholder="email"
          {...register("login", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input
          className="text-field"
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        />

        {errors.password && <span>This field is required</span>}
        <input className="button" type="submit"></input>
      </form>
    </>
  );
};

export default RegisterPage;
