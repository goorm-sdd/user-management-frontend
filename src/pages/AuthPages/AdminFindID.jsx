import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import FindIDForm from "../../components/auth/FindIDForm";

const AdminFindID = () => {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <FindIDForm role="admin" />
      </AuthLayout>
    </>
  );
};
export default AdminFindID;
