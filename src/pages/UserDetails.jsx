import PageBreadcrumb from "../components/common/PageBreadCrumb";
import AdminUserDetail from "../components/UserProfile/AdminUserDetail";
import PageMeta from "../components/common/PageMeta";

const AdminUserDetails = () => {
  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="회원 상세 정보" />
        <div className="space-y-6">
          <AdminUserDetail />
        </div>
    </>
  );
}
export default AdminUserDetails;