import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
import { GET_USER_INFOS } from "../GraphQL/Query";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation({
    refetchQueries: [{ query: GET_USER_INFOS }],
  });

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
    console.log(data);
    login({
      variables: { data: { email: data.login, password: data.password } },
      onCompleted: () => {
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
        <h1>Page de connexion</h1>
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
        <a className="linkSubscribe" href="register">
          Pas encore inscrit?
        </a>
        <a className="linkSubscribe" href="forgotPassword">
          Mot de passe oublié?
        </a>
      </form>
    </>
  );
};

export default LoginPage;
