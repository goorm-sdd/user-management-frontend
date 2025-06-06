import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { findIdSchema } from "../../schemas/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { findEmail } from "../../services/authService";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const FindIDForm = ({ role = "user" }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(findIdSchema) });

  const phoneValue = watch("phone") || "";
  const codeValue = watch("code") || "";

  // 인증 관련 상태
  const [sentCode, setSentCode] = useState(""); //가짜 코드 발송
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [message, setMessage] = useState("");

  // 가짜 인증번호 발송
  const handleSendCode = () => {
    const generatedCode = "123456";
    setSentCode(generatedCode);
    setCodeVerified(false);
    setCodeError("");
    setMessage("인증번호가 발송되었습니다.");
    console.log("발송된 인증번호:", generatedCode);
  };

  // 인증번호 확인
  const handleVerifyCode = () => {
    if (codeValue === sentCode) {
      setCodeVerified(true);
      setCodeError("");
    } else {
      setCodeVerified(false);
      setCodeError("인증번호가 일치하지 않습니다.");
    }
  };

  //인증번호 발송
  //   const handleSendCode = async () => {
  //   try {
  //     await sendVerificationCode(phoneValue);
  //     setMessage("인증번호가 발송되었습니다.");
  //     setCodeError("");
  //   } catch (err) {
  //     console.error(err);
  //     setMessage("");
  //     setCodeError(err.response?.data?.message || "인증번호 발송 실패");
  //   }
  // };

  // 인증번호 확인
  // const handleVerifyCode = async () => {
  //   try {
  //     await verifyCode({ phoneNumber: phoneValue, code: codeValue });
  //     setCodeVerified(true);
  //     setCodeError("");
  //   } catch (err) {
  //     console.error(err);
  //     setCodeVerified(false);
  //     setCodeError(err.response?.data?.message || "인증번호 확인 실패");
  //   }
  // };

  const onSubmit = async (data) => {
    if (!codeVerified) {
      alert("인증을 완료해주세요.");
      return;
    }

    try {
      const response = await findEmail({
        name: data.name,
        phone: data.phone,
        code: data.code,
        sentCode, // 인증 성공을 위해 사용된 코드
      });

      console.log("최종 제출 데이터:", data);
      navigate("/found-email", {
        state: { email: response.data.email, role },
      });
    } catch (err) {
      alert(err.response?.data?.message || "이메일 찾기 실패");
    }
  };

  const handleForgotClick = () => {
    if (role === "admin") {
      navigate("/admin-reset-password");
    } else {
      navigate("/reset-password");
    }
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
              {/* 이름 입력 */}
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

              {/* 전화번호 입력 + 인증번호 발송 */}
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
                  <Button
                    type="button"
                    onClick={handleSendCode}
                    disabled={phoneValue.trim() === ""}
                  >
                    인증번호 발송
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

              {/* 인증번호 입력 + 확인 */}
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
                  <Button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={codeValue.trim() === ""}
                  >
                    인증번호 확인
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
                  <p className="mt-1 text-sm text-green-500"> 인증 성공</p>
                )}
              </div>

              {/* 비밀번호 찾기로 이동 */}
              <div className="flex justify-end my-3">
                <span
                  onClick={handleForgotClick}
                  className="cursor-pointer text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  아뇨, 비밀번호가 기억이 안납니다..
                </span>
              </div>

              {/* 제출 */}
              <div>
                <Button className="w-full" size="sm" type="submit">
                  Find email
                </Button>
              </div>
            </div>
          </form>

          {/* 로그인으로 돌아가기 */}
          <div className="flex items-center gap-2 mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              잠깐, 이메일이 기억난 거 같아요
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
  );
};

export default FindIDForm;
