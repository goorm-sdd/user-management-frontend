import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../schemas/authSchema";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const ResetPasswordForm = ({ role = "user" }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  const phoneValue = watch("phone") || "";
  const codeValue = watch("code") || "";

  const handleForgotClick = () => {
    if (role === "admin") {
      navigate("/admin-find-id");
    } else {
      navigate("/find-id");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    navigate("/password-sent", { state: { role } });
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Forgot Your Password?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              이름, 이메일, 전화번호, 인증번호를 입력하시면 임시 비밀번호를
              보내드립니다.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    이름 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="홍길동" {...register("name")} />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>
                    이메일 <span className="text-error-500">*</span>
                  </Label>
                  <Input placeholder="info@gmail.com" {...register("email")} />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>
                    전화번호 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="flex items-center justify-between">
                    <Input
                      className="flex-grow mr-35"
                      placeholder="010-0000-0000"
                      {...register("phone")}
                    />
                    <Button disabled={phoneValue.trim() === ""}>
                      인증번호 발송
                    </Button>
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>
                    인증번호 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="flex items-center justify-between">
                    <Input
                      className="flex-grow mr-35"
                      placeholder="000000"
                      {...register("code")}
                    />
                    <Button disabled={codeValue.trim() === ""}>
                      인증번호 확인
                    </Button>
                  </div>
                  {errors.code && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.code.message}{" "}
                    </p>
                  )}
                </div>
                <div className="flex justify-end my-3">
                  <span
                    onClick={handleForgotClick}
                    className="cursor-pointer text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    아뇨, 이메일이 기억이 안납니다..
                  </span>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit">
                    Send password
                  </Button>
                </div>
              </div>
            </form>

            <div className="flex items-center gap-2 mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                잠깐, 비밀번호가 기억난 거 같아요
              </p>
              {role !== "admin" && (
                <Link
                  to="/"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  로그인하기
                </Link>
              )}
              {role === "admin" && (
                <Link
                  to="/admin-signin"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  로그인하기
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordForm;
