import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const FindIDForm = ({ role = "user" }) => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleForgotClick = () => {
    if (role === "admin") {
      navigate("/admin-reset-password");
    } else {
      navigate("/reset-password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/found-email", { state: { role } });
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
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    이름 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="홍길동" />
                </div>
                <div>
                  <Label>
                    전화번호 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="flex items-center justify-between">
                    <Input
                      className="flex-grow mr-35"
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button disabled={phone.trim() === ""}>
                      인증번호 발송
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>
                    인증번호 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="flex items-center justify-between">
                    <Input
                      className="flex-grow mr-35"
                      placeholder="000000"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <Button disabled={code.trim() === ""}>인증번호 확인</Button>
                  </div>
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
                  <Button className="w-full" size="sm" type="submit">
                    Find email
                  </Button>
                </div>
              </div>
            </form>

            <div className="flex items-center gap-2 mt-5 ">
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
    </div>
  );
};
export default FindIDForm;
