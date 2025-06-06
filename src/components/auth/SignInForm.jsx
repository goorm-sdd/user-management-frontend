import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../schemas/authSchema";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { login } from "../../services/authService";
import useAuthStore from "../../store/useAuthStore";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

const SignInForm = ({ role = "user" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const { login: loginUser } = useAuthStore();

  const onSubmit = async (formData) => {
    try {
      const res = await login(formData);
      const { accessToken, user } = res.data;

      localStorage.setItem("accessToken", accessToken);
      loginUser(user);

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/login-success");
      }
    } catch (err) {
      const message = err.response?.data?.message || "로그인에 실패했습니다.";
      setErrorMessage(message);
    }
  };

  const handleForgotClick = () => {
    if (role === "admin") {
      navigate("/admin-find-id");
    } else {
      navigate("/find-id");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              이메일과 비밀번호를 입력하고 로그인 하세요!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    이메일 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="info@example.com"
                    {...register("email")}
                    error={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>
                    비밀번호 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요"
                      {...register("password")}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}{" "}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      로그인 상태 유지
                    </span>
                  </div>
                  <span
                    onClick={handleForgotClick}
                    className="cursor-pointer text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    이메일 또는 비밀번호를 잊어버렸나요?
                  </span>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit">
                    Sign in
                  </Button>
                </div>
                {errorMessage && (
                  <p className="mt-2 text-sm text-red-500 text-center">
                    {errorMessage}
                  </p>
                )}
                {role !== "admin" && (
                  <div className="flex items-center gap-2">
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      회원이 아니신가요?
                    </span>
                    <Link
                      to="/sign-up"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      회원가입
                    </Link>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInForm;
