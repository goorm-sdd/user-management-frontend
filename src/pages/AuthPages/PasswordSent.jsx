import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../src/components/ui/button/Button";

const PasswordSent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "user";

  const handleGoToSignIn = () => {
    if (role === "admin") {
      navigate("/admin-signin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold">
          입력하신 이메일로 비밀번호가 전송되었습니다.
        </h1>
        <Button onClick={handleGoToSignIn}> Go to Sign in!</Button>
      </div>
    </div>
  );
};
export default PasswordSent;
