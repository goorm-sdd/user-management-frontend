import FindEmailForm from "../../components/auth/FindEmailForm";

const AdminFindEmail = () => {
  return (
    <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
      <FindEmailForm role="admin" />
    </div>
  );
};
export default AdminFindEmail;
