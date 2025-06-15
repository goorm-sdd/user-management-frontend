import { useSignUp } from "../../hooks/useSignUp.js";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isSubmitting,
    watchedFields,
    emailState,
    handleCheckEmail,
    handleEmailChange,
    codeState,
    handleSendCode,
    handleVerifyCode,
    handlePhoneChange,
  } = useSignUp();

  // 통일된 메시지 컴포넌트
  const Message = ({ message, type = "success" }) => (
    <div
      className={`p-3 text-sm ${
        type === "success" ? "text-green-700" : "text-red-700"
      }`}
    >
      {message}
    </div>
  );

  // 통일된 에러 메시지 컴포넌트
  const ErrorMessage = ({ error }) =>
    error && <p className="mt-1 text-sm text-red-500">{error}</p>;

  // 비밀번호 토글 아이콘 (접근성 개선)
  const PasswordToggle = ({ show, onToggle, ariaLabel }) => (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      tabIndex={0}
      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 p-1"
    >
      {show ? (
        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
      ) : (
        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
      )}
    </button>
  );

  // 이메일 중복확인 버튼 상태 계산
  const getEmailButtonText = () => {
    if (emailState.isChecking) return "확인 중...";
    if (emailState.isChecked) return "확인 완료";
    return "중복 확인";
  };

  // 전화번호 인증 버튼 상태 계산
  const getPhoneButtonText = () => {
    if (codeState.isSending) return "발송 중...";
    if (codeState.isVerified) return "인증 완료";
    return "인증번호 발송";
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              이메일과 비밀번호를 입력하여 가입하세요!
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-5">
                {/* Username */}
                <div>
                  <Label>
                    사용자명<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="홍길동"
                    {...register("username")}
                    error={!!errors.username}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage error={errors.username?.message} />
                </div>

                {/* Email */}
                <div>
                  <Label>
                    이메일 주소<span className="text-error-500">*</span>
                  </Label>
                  <div className="flex items-center justify-between">
                    <Input
                      className="flex-1 pr-40"
                      placeholder="info@example.com"
                      {...register("email", {
                        onChange: handleEmailChange,
                      })}
                      error={!!errors.email || !!emailState.error}
                      disabled={emailState.isChecked || isSubmitting}
                    />
                    <Button
                      type="button"
                      onClick={handleCheckEmail}
                      disabled={
                        !watchedFields.email?.trim() ||
                        emailState.isChecking ||
                        emailState.isChecked ||
                        isSubmitting
                      }
                      className="whitespace-nowrap flex-shrink-0"
                    >
                      {getEmailButtonText()}
                    </Button>
                  </div>
                  {emailState.message && (
                    <Message message={emailState.message} />
                  )}
                  {emailState.error && (
                    <Message message={emailState.error} type="error" />
                  )}
                  <ErrorMessage error={errors.email?.message} />
                </div>

                {/* Password */}
                <div>
                  <Label>
                    비밀번호 <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요"
                      {...register("password")}
                      error={!!errors.password}
                      disabled={isSubmitting}
                    />
                    <PasswordToggle
                      show={showPassword}
                      onToggle={() => setShowPassword(!showPassword)}
                      ariaLabel="비밀번호 표시/숨김"
                    />
                  </div>
                  <ErrorMessage error={errors.password?.message} />
                </div>

                {/* Password Check */}
                <div>
                  <Label>
                    비밀번호 확인 <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="비밀번호를 다시 입력하세요"
                      {...register("passwordCheck")}
                      error={!!errors.passwordCheck}
                      disabled={isSubmitting}
                    />
                    <PasswordToggle
                      show={showConfirmPassword}
                      onToggle={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      ariaLabel="비밀번호 확인 표시/숨김"
                    />
                  </div>
                  <ErrorMessage error={errors.passwordCheck?.message} />
                </div>

                {/* Phone Number */}
                <div>
                  <Label>
                    전화번호 <span className="text-error-500">*</span>
                  </Label>
                  <div className="flex items-center justify-between">
                    <Input
                      className="flex-1 pr-40"
                      placeholder="010-0000-0000"
                      {...register("phoneNumber", {
                        onChange: handlePhoneChange,
                      })}
                      error={!!errors.phoneNumber}
                      disabled={codeState.isVerified || isSubmitting}
                    />
                    <Button
                      type="button"
                      onClick={handleSendCode}
                      disabled={
                        !watchedFields.phoneNumber?.trim() ||
                        codeState.isSending ||
                        codeState.isVerified ||
                        isSubmitting
                      }
                      className="whitespace-nowrap flex-shrink-0"
                    >
                      {getPhoneButtonText()}
                    </Button>
                  </div>
                  <ErrorMessage error={errors.phoneNumber?.message} />

                  {/* Messages */}
                  {codeState.message && <Message message={codeState.message} />}
                  {codeState.error && !codeState.isSent && (
                    <Message message={codeState.error} type="error" />
                  )}
                  {errors.root && !codeState.isSent && (
                    <Message message={errors.root.message} type="error" />
                  )}
                </div>

                {/* Verification Code */}
                {codeState.isSent && !codeState.isVerified && (
                  <div>
                    <Label>
                      인증번호 <span className="text-error-500">*</span>
                    </Label>
                    <div className="flex items-center justify-between">
                      <Input
                        className="flex-1 pr-40"
                        placeholder="000000"
                        {...register("code")}
                        error={!!errors.code || !!codeState.error}
                        disabled={codeState.isVerified || isSubmitting}
                        maxLength={6}
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyCode}
                        disabled={
                          !watchedFields.code?.trim() ||
                          codeState.isVerifying ||
                          codeState.isVerified ||
                          isSubmitting
                        }
                        className="whitespace-nowrap flex-shrink-0"
                      >
                        {codeState.isVerifying ? "확인 중..." : "인증번호 확인"}
                      </Button>
                    </div>
                    {codeState.error && codeState.isSent && (
                      <Message message={codeState.error} type="error" />
                    )}
                    <ErrorMessage error={errors.code?.message} />
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "가입 중..." : "Sign Up"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                이미 계정이 있으신가요?{" "}
                <a
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  href="/"
                  data-discover="true"
                >
                  로그인하기
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
