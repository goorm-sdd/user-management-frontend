import SignUpForm from "../../components/auth/SignUpForm";

const UserSignUp = () => {
  return (
    <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
      <SignUpForm />
    </div>
  );
}
export default UserSignUp;