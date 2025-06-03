import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import NotCertifiedUserTable from "../../components/tables/DataTables/NotCertifiedUserTable";

const NotCertifiedUserTables = () => {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="미인증 회원" />
      <div className="space-y-6">
        <NotCertifiedUserTable />
      </div>
    </>
  );
}
export default NotCertifiedUserTables;