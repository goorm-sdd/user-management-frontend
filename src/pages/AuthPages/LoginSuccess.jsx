import { Link } from "react-router-dom";

const LoginSuccess = () => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <div className="mx-auto w-full max-w-[274px] text-center sm:max-w-[555px]">
          <div className="mx-auto mb-10 w-full max-w-[100px] text-center sm:max-w-[160px]">
            <img
              src="/images/error/success.svg"
              alt="success"
              className="dark:hidden"
            />
            <img
              src="/images/error/success-dark.svg"
              alt="success"
              className="hidden dark:block"
            />
          </div>
          <h1 className="mb-2 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            SUCCESS !
          </h1>
          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            로그인에 성공하셨습니다.
            <p>아래의 버튼을 눌러 프로필 페이지로 이동하실 수 있습니다.</p>
          </p>

          <Link
            to="/profile"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Go to profile page
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginSuccess;
