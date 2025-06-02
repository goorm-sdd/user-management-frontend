import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DeleteUserTable from "../../components/tables/DataTables/DeleteUserTable";

const DeleteUserTables = () => {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="회원 탈퇴" />
      <div className="space-y-6">
        <DeleteUserTable />
      </div>
    </>
  );
}
export default DeleteUserTables;