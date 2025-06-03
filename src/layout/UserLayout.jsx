import { Outlet } from "react-router";
import UserHeader from "./UserHeader";

const LayoutContent = () => {

  return (
    <div className="min-h-screen">
        <UserHeader />
        <Outlet />
      </div>
  );
};

const UserLayout = () => {
  return (
    <LayoutContent />
  );
};

export default UserLayout;
