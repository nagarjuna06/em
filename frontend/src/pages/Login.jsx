import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validations/login";
import Input from "../components/ui/input";
import { KeyIcon, UserCircleIcon } from "lucide-react";
import Button from "../components/ui/button";
import { useSession } from "../providers/session";

const Login = () => {
  const { login, loading } = useSession();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const res = await login(data);

    if (!res.success) {
      const { message, data } = res;

      setError(data.path, {
        message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <form
        className="w-[400px] flex flex-col gap-4 items-center shadow-lg  p-5 bg-white rounded-badge"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img src="/dealsdray.png" width={100} height={100} />
        <Input
          register={register("username")}
          error={errors.username}
          Icon={<UserCircleIcon />}
        />
        <Input
          type="password"
          register={register("password")}
          error={errors.password}
          Icon={<KeyIcon />}
        />
        <Button loading={loading} className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
