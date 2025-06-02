import SignInForm from "../../components/auth/SignInForm";

 const UserSignIn = () => {
  return (
    <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
      <SignInForm />
    </div>
  );
}
export default UserSignIn;