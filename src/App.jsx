import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignIn from "./pages/AuthPages/UserSignIn";
import UserSignUp from "./pages/AuthPages/UserSignUp";
import NotFound from "./pages/OtherPage/NotFound";
import ErrorServer from "./pages/OtherPage/ErrorServer";
import Success from "./pages/OtherPage/Success";
import LoginSuccess from "./pages/AuthPages/LoginSuccess";
import UserProfiles from "./pages/UserProfiles";
import DashboardTables from "./pages/Tables/DashboardTables";
import DeleteUserTables from "./pages/Tables/DeleteUserTables";
import NotCertifiedUserTables from "./pages/Tables/NotCertifiedUserTables";
import UserTables from "./pages/Tables/UserTables";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import ScrollToTop from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard/Dashboard";
import FindID from "./pages/AuthPages/FindId";
import FoundEmail from "./pages/AuthPages/FoundEmail";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import PasswordSent from "./pages/AuthPages/PasswordSent";
import AdminSignIn from "./pages/AuthPages/AdminSignin";
import AdminSignUp from "./pages/AuthPages/AdminSignUp";

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/dashboard-tables" element={<DashboardTables />} />
            <Route path="/user-tables" element={<UserTables />} />
            <Route path="/delete-user" element={<DeleteUserTables />} />
            <Route
              path="/not-certified-user"
              element={<NotCertifiedUserTables />}
            />
          </Route>

          {/* Auth Layout */}
          <Route path="/admin-signin" element={<AdminSignIn />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />

          <Route path="/user-signin" element={<UserSignIn />} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/find-id" element={<FindID />} />
          <Route path="/found-email" element={<FoundEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-sent" element={<PasswordSent />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error-server" element={<ErrorServer />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
