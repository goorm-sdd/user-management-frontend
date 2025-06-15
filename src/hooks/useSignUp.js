import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../schemas/authSchema";
import {
  signUp,
  sendVerificationCode,
  verifyCode,
  checkEmailDuplicate,
} from "../services/authService";

export const useSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 이메일 상태
  const [emailState, setEmailState] = useState({
    isChecked: false,
    isChecking: false,
    message: "",
    error: "",
  });

  // 인증번호 상태
  const [codeState, setCodeState] = useState({
    isSent: false,
    isVerified: false,
    isSending: false,
    isVerifying: false,
    message: "",
    error: "",
  });

  const formMethods = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordCheck: "",
      phoneNumber: "",
      code: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    setError,
  } = formMethods;
  const watchedFields = watch();

  // 회원가입 제출
  const onSubmit = async (data) => {
    if (!emailState.isChecked) {
      alert("이메일 중복확인을 완료해주세요.");
      return;
    }

    if (!codeState.isVerified) {
      alert("휴대폰 인증을 완료해주세요.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await signUp(data);

      // 성공 처리
      alert("회원가입이 완료되었습니다. 이메일을 확인해주세요.");
      console.log("회원가입 성공:", result);
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
      const errorMessage =
        error.response?.data?.message ||
        "회원가입에 실패했습니다. 다시 시도해주세요.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    const isEmailValid = await trigger("email");
    if (!isEmailValid) return alert("올바른 이메일을 입력해주세요.");

    setEmailState((prev) => ({
      ...prev,
      isChecking: true,
      error: "",
      message: "",
    }));
    try {
      await checkEmailDuplicate(watchedFields.email);
      setEmailState((prev) => ({
        ...prev,
        isChecked: true,
        message: "사용 가능한 이메일입니다.",
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "이미 사용 중인 이메일입니다.";
      setEmailState((prev) => ({
        ...prev,
        error: errorMessage,
        isChecked: false,
      }));
    } finally {
      setEmailState((prev) => ({ ...prev, isChecking: false }));
    }
  };

  // 인증번호 발송
  const handleSendCode = async () => {
    const isPhoneValid = await trigger("phoneNumber");
    if (!isPhoneValid) return alert("올바른 전화번호를 입력해주세요.");

    setCodeState((prev) => ({
      ...prev,
      isSending: true,
      error: "",
      message: "",
    }));
    try {
      await sendVerificationCode(watchedFields.phoneNumber);
      setCodeState((prev) => ({
        ...prev,
        isSent: true,
        message: "인증번호가 발송되었습니다.",
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "인증번호 발송에 실패했습니다.";
      setCodeState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setCodeState((prev) => ({ ...prev, isSending: false }));
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!watchedFields.code?.trim()) return alert("인증번호를 입력해주세요.");
    const isCodeValid = await trigger("code");
    if (!isCodeValid) return;

    setCodeState((prev) => ({ ...prev, isVerifying: true, error: "" }));
    try {
      await verifyCode({
        phoneNumber: watchedFields.phoneNumber,
        code: watchedFields.code,
      });
      setCodeState((prev) => ({
        ...prev,
        isVerified: true,
        message: "인증이 완료되었습니다.",
        error: "",
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "인증번호가 올바르지 않습니다.";
      setCodeState((prev) => ({
        ...prev,
        error: errorMessage,
        isVerified: false,
      }));
    } finally {
      setCodeState((prev) => ({ ...prev, isVerifying: false }));
    }
  };

  // 초기화 함수들
  const handleEmailChange = () => {
    if (emailState.isChecked) {
      setEmailState((prev) => ({
        ...prev,
        isChecked: false,
        message: "",
        error: "",
      }));
    }
  };

  const handlePhoneChange = () => {
    if (codeState.isSent || codeState.isVerified) {
      setCodeState({
        isSent: false,
        isVerified: false,
        isSending: false,
        isVerifying: false,
        message: "",
        error: "",
      });
    }
  };

  return {
    // Form methods
    register,
    handleSubmit,
    errors,
    isValid,
    watchedFields,
    onSubmit,

    // UI state
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isSubmitting,

    // Email state
    emailState,
    handleCheckEmail,
    handleEmailChange,

    // Code state
    codeState,
    handleSendCode,
    handleVerifyCode,
    handlePhoneChange,
  };
};
