import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AdminUserDetail from "../../components/UserProfile/AdminUserDetail";

const AdminUserDetails = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="회원 상세 정보" />
      <div className="space-y-6">
        <AdminUserDetail />
      </div>
    </>
  );
}
export default AdminUserDetails;