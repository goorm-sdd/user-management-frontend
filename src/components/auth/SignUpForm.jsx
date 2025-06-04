import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
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
            <form>
              <div className="space-y-5">
                {/* <!-- Name --> */}
                <div>
                  <Label>
                    이름<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="홍길동"
                  />
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    이메일 주소<span className="text-error-500">*</span>
                  </Label>
                  <div className="flex items-center justify-between">
                    <Input
                      className="flex-grow mr-41"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="이메일 주소"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button disabled={email.trim() === ""}>중복 확인</Button>
                  </div>
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    비밀번호<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="비밀번호"
                      type={showPassword ? "text" : "password"}
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
                </div>
                {/* <!-- Confirm Password --> */}
                <div>
                  <Label>
                    비밀번호 확인<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="비밀번호 확인"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() =>
                        setShowConfirmShowPassword(!showConfirmPassword)
                      }
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Phone Number --> */}
                <div>
                  <Label>
                    전화번호<span className="text-error-500">*</span>
                  </Label>
                  <div className="flex items-center justify-between">
                    <Input
                      className="flex-grow mr-35"
                      placeholder="010-0000-0000"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button disabled={phone.trim() === ""}>
                      인증번호 발송
                    </Button>
                  </div>
                </div>
                {/* <!-- Verification Code  * --> */}
                <div>
                  <Label>
                    인증번호 *<span className="text-error-500">*</span>
                  </Label>
                  <div className="flex items-center justify-between">
                    <Input
                      className="flex-grow mr-35"
                      placeholder="000000"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <Button disabled={verificationCode.trim() === ""}>
                      인증번호 확인
                    </Button>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-2 mt-10">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block text-sm font-normal text-gray-500 dark:text-gray-400">
                    계정을 생성하면{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      이용 약관,
                    </span>{" "}
                    및{" "}
                    <span className="text-gray-800 dark:text-white">
                      개인정보 보호정책
                    </span>
                    동의하는 것으로 간주됩니다.
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <Button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign Up
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
