import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../src/components/ui/button/Button";

const FoundEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const role = location.state?.role || "user";

  const handleGoToSignIn = () => {
    if (role === "admin") {
      navigate("/admin-signin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen dark:bg-gray-900 px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md space-y-6">
        {email ? (
          <>
            <h2 className="text-2xl font-bold mb-4">회원님의 이메일은</h2>
            <p className="text-xl text-brand-500">{email}</p>
          </>
        ) : (
          <p className="text-red-500">이메일 정보를 찾을 수 없습니다.</p>
        )}
        <Button className="w-full" onClick={handleGoToSignIn}>
          Go to Sign in!
        </Button>
      </div>
    </div>
  );
};

export default FoundEmail;
