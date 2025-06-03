import FindIDForm from "../../components/auth/FindIDFrom";

const FindID = () => {
  return (
    <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <FindIDForm />
      </div>
    </div>
  );
};
export default FindID;
