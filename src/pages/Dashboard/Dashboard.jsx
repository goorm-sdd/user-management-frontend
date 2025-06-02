import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import DashboardTable from "../../components/tables/BasicTables/DashboardTable";

const Dashboard = () => {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="space-y-6">
        <EcommerceMetrics />
      </div>
      <div className="space-y-6 mt-6">
        <ComponentCard title="회원 목록">
          <DashboardTable />
        </ComponentCard>
      </div>
    </>
  );
}
export default Dashboard;
