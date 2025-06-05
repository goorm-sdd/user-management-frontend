import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";

const LayoutContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <UserHeader />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

const UserLayout = () => {
  
  return (
    <LayoutContent />
  );
};

export default UserLayout;
