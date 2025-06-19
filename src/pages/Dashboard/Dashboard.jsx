import { useState } from "react";
import UserMetrics from "../../components/User/UserMetrics";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import DashboardTable from "../../components/tables/BasicTables/DashboardTable";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="space-y-6">
        <UserMetrics refreshTrigger={refreshKey} />
      </div>
      <div className="space-y-6 mt-6">
        <ComponentCard title="전체 회원 조회">
          <DashboardTable onStatusChangeSuccess={triggerRefresh} />
        </ComponentCard>
      </div>
    </>
  );
};
export default Dashboard;
