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
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema), mode: "onChange" });

  const codeValue = watch("code") || "";

  const [sentCode, setSentCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [message, setMessage] = useState("");

  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 인증번호 발송 (가짜)
  const handleSendCode = async () => {
    const isValid = await trigger("phone");
    if (!isValid) return;

    setLoadingSend(true);
    const generatedCode = "123456";
    setTimeout(() => {
      setSentCode(generatedCode);
      setCodeVerified(false);
      setCodeError("");
      setMessage("인증번호가 발송되었습니다.");
      console.log("발송된 인증번호:", generatedCode);
      setLoadingSend(false);
    }, 1000);
  };

  // 인증번호 확인
  const handleVerifyCode = () => {
    setLoadingVerify(true);
    setTimeout(() => {
      if (codeValue === sentCode) {
        setCodeVerified(true);
        setCodeError("");
      } else {
        setCodeVerified(false);
        setCodeError("인증번호가 일치하지 않습니다.");
      }
      setLoadingVerify(false);
    }, 800);
  };

  // 제출
  const onSubmit = async (data) => {
    if (!codeVerified) {
      alert("인증을 완료해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      console.log("입력된 정보:", data);
      alert("테스트용: 임시 비밀번호가 발송되었다고 가정");
      navigate("/password-sent", { state: { role } });
    } catch (err) {
      alert("오류 발생");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotClick = () => {
    navigate(role === "admin" ? "/admin-find-id" : "/find-id");
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* 이름 */}
              <div>
                <Label>
                  이름 <span className="text-error-500">*</span>
                </Label>
                <Input placeholder="홍길동" {...register("name")} />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* 이메일 */}
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

              {/* 전화번호 + 발송 */}
              <div>
                <Label>
                  전화번호 <span className="text-error-500">*</span>
                </Label>
                <div className="flex items-center justify-between">
                  <Input
                    className="flex-grow mr-35"
                    placeholder="010-0000-0000"
                    {...register("phone")}
                    disabled={codeVerified || loadingSend || submitting}
                  />
                  <Button
                    type="button"
                    onClick={handleSendCode}
                    disabled={codeVerified || loadingSend || submitting}
                  >
                    {loadingSend ? "발송 중..." : "인증번호 발송"}
                  </Button>
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
                {message && (
                  <p className="mt-1 text-sm text-green-500">{message}</p>
                )}
              </div>

              {/* 인증번호 + 확인 */}
              <div>
                <Label>
                  인증번호 <span className="text-error-500">*</span>
                </Label>
                <div className="flex items-center justify-between">
                  <Input
                    className="flex-grow mr-35"
                    placeholder="000000"
                    {...register("code")}
                    disabled={codeVerified || loadingVerify || submitting}
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

              {/* 이메일 찾기 이동 */}
              <div className="flex justify-end my-3">
                <span
                  onClick={handleForgotClick}
                  className="cursor-pointer text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  아뇨, 이메일이 기억이 안납니다..
                </span>
              </div>

              {/* 제출 버튼 */}
              <div>
                <Button
                  className="w-full"
                  size="sm"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "처리 중..." : "Send password"}
                </Button>
              </div>
            </div>
          </form>

          {/* 로그인 돌아가기 */}
          <div className="flex items-center gap-2 mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              잠깐, 비밀번호가 기억난 거 같아요
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

export default ResetPasswordForm;
