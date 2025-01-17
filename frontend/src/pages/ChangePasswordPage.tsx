import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useChangePasswordMutation } from "../generated/graphql-types";

const ChangePasswordPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();
  const { code } = useParams();
  type Inputs = {
    code: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    changePassword({
      variables: { code: data.code, password: data.password },
      onCompleted: () => {
        navigate("/");
        toast.success("Your password has been changed");
      },
      onError: () => {
        toast.error("Error");
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
      <h2>Vérifiez vos Emails</h2>
      <input
        className="text-field"
        defaultValue={code}
        placeholder="code"
        {...register("code", { required: true })}
      />
      {errors.code && <span>This field is required</span>}
      <h1>Choisissez un nouveau mot de passe</h1>

      <input
        className="text-field"
        placeholder="password"
        type="password"
        {...register("password", { required: true })}
      />

      {errors.password && <span>This field is required</span>}
      <input className="button" type="submit" />
    </form>
  );
};

export default ChangePasswordPage;
