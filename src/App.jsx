import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import AppLayout from "./layout/AppLayout";
import UserLayout from "./layout/UserLayout";

import UserSignIn from "./pages/AuthPages/UserSignIn";
import UserSignUp from "./pages/AuthPages/UserSignUp";
import LoginSuccess from "./pages/AuthPages/LoginSuccess";
import UserFindID from "./pages/AuthPages/UserFindID";
import FoundEmail from "./pages/AuthPages/FoundEmail";
import UserResetPassword from "./pages/AuthPages/UserResetPassword";
import PasswordSent from "./pages/AuthPages/PasswordSent";
import Success from "./pages/OtherPage/Success";
import ErrorServer from "./pages/OtherPage/ErrorServer";
import NotFound from "./pages/OtherPage/NotFound";
import ForbiddenPage from "./pages/OtherPage/ForbiddenPage";

import UserProfiles from "./pages/UserProfiles/UserProfiles";
import UserEditProfiles from "./pages/UserProfiles/UserEditProfiles";

import AdminSignIn from "./pages/AuthPages/AdminSignin";
import AdminFindID from "./pages/AuthPages/AdminFindID";
import AdminResetPassword from "./pages/AuthPages/AdminResetPassword";
import AdminUserDetails from "./pages/UserProfiles/AdminUserDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardTables from "./pages/Tables/DashboardTables";
import DeleteUserTables from "./pages/Tables/DeleteUserTables";
import NotCertifiedUserTables from "./pages/Tables/NotCertifiedUserTables";
import UserTables from "./pages/Tables/UserTables";
import FormElements from "./pages/Forms/FormElements";

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 사용자 라우트 */}
          <Route path="/" element={<UserSignIn />} />
          <Route path="/sign-up" element={<UserSignUp />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/find-id" element={<UserFindID />} />
          <Route path="/found-email" element={<FoundEmail />} />
          <Route path="/reset-password" element={<UserResetPassword />} />
          <Route path="/password-sent" element={<PasswordSent />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error-server" element={<ErrorServer />} />

          <Route
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/profile-edit" element={<UserEditProfiles />} />
          </Route>

          {/* 관리자 라우트 */}
          <Route path="/admin-signin" element={<AdminSignIn />} />
          <Route path="/admin-find-id" element={<AdminFindID />} />
          <Route path="/admin-found-email" element={<FoundEmail />} />
          <Route
            path="/admin-reset-password"
            element={<AdminResetPassword />}
          />
          <Route path="/admin-password-sent" element={<PasswordSent />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="user-detail" element={<AdminUserDetails />} />
            <Route path="form-elements" element={<FormElements />} />
            <Route path="dashboard-tables" element={<DashboardTables />} />
            <Route path="user-tables" element={<UserTables />} />
            <Route path="delete-user" element={<DeleteUserTables />} />
            <Route
              path="not-certified-user"
              element={<NotCertifiedUserTables />}
            />
          </Route>

          {/* 접근 금지 페이지 */}
          <Route path="/403" element={<ForbiddenPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
