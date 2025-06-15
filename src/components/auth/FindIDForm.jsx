import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { findIdSchema } from "../../schemas/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  sendVerificationCode,
  verifyCode,
  findEmail,
} from "../../services/authService";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const FindIDForm = ({ role = "user" }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(findIdSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const phoneValue = watch("phoneNumber") || "";
  const codeValue = watch("code") || "";

  const [codeVerified, setCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [message, setMessage] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSendCode = async () => {
    const isValid = await trigger("phoneNumber");
    if (!isValid) return;

    setLoadingSend(true);
    try {
      await sendVerificationCode(phoneValue);
      setMessage("인증번호가 발송되었습니다.");
      setCodeVerified(false);
      setCodeError("");
    } catch (error) {
      setMessage("");
      setCodeError(error.response?.data?.message || "인증번호 발송 실패");
    } finally {
      setLoadingSend(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoadingVerify(true);
    try {
      await verifyCode({ phoneNumber: phoneValue, code: codeValue });
      setCodeVerified(true);
      setCodeError("");
    } catch (error) {
      setCodeVerified(false);
      setCodeError(error.response?.data?.message || "인증번호 확인 실패");
    } finally {
      setLoadingVerify(false);
    }
  };

  const onSubmit = async (data) => {
    if (!codeVerified) {
      alert("인증을 완료해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await findEmail({
        username: data.name,
        phoneNumber: data.phoneNumber,
        code: data.code,
      });
      navigate("/found-email", {
        state: { email: response.data.email, role },
      });
    } catch (err) {
      alert(err.response?.data?.message || "이메일 찾기 실패");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotClick = () => {
    navigate(role === "admin" ? "/admin-reset-password" : "/reset-password");
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Forgot Your Email?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              이름, 전화번호, 인증번호를 입력하시면 이메일이 표시됩니다.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label>
                  이름 <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="홍길동"
                  disabled={submitting}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label>
                  전화번호 <span className="text-error-500">*</span>
                </Label>
                <div className="flex items-center justify-between">
                  <Input
                    className="flex-grow mr-35"
                    placeholder="010-0000-0000"
                    disabled={codeVerified || loadingSend || submitting}
                    {...register("phoneNumber")}
                  />
                  <Button
                    type="button"
                    onClick={handleSendCode}
                    disabled={codeVerified || loadingSend || submitting}
                  >
                    {loadingSend ? "발송 중..." : "인증번호 발송"}
                  </Button>
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
                {message && (
                  <p className="mt-1 text-sm text-green-500">{message}</p>
                )}
              </div>

              <div>
                <Label>
                  인증번호 <span className="text-error-500">*</span>
                </Label>
                <div className="flex items-center justify-between">
                  <Input
                    className="flex-grow mr-35"
                    placeholder="000000"
                    disabled={codeVerified || loadingVerify || submitting}
                    {...register("code")}
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={
                      codeVerified ||
                      codeValue.trim() === "" ||
                      loadingVerify ||
                      submitting
                    }
                  >
                    {loadingVerify ? "확인 중..." : "인증번호 확인"}
                  </Button>
                </div>
                {errors.code && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.code.message}
                  </p>
                )}
                {codeError && (
                  <p className="mt-1 text-sm text-red-500">{codeError}</p>
                )}
                {codeVerified && (
                  <p className="mt-1 text-sm text-green-500">인증 성공</p>
                )}
              </div>

              <div className="flex justify-end my-3">
                <span
                  onClick={handleForgotClick}
                  className="cursor-pointer text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  아뇨, 비밀번호가 기억이 안납니다..
                </span>
              </div>

              <div>
                <Button
                  className="w-full"
                  size="sm"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "조회 중..." : "Find email"}
                </Button>
              </div>
            </div>
          </form>

          <div className="flex items-center gap-2 mt-5">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              잠깐, 이메일이 기억난 거 같아요
            </p>
            <Link
              to={role === "admin" ? "/admin-signin" : "/"}
              className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindIDForm;
