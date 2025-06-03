import { BrowserRouter as Router, Routes, Route } from "react-router";
import UserSignIn from "./pages/AuthPages/UserSignIn";
import UserSignUp from "./pages/AuthPages/UserSignUp";
import NotFound from "./pages/OtherPage/NotFound";
import ErrorServer from "./pages/OtherPage/ErrorServer";
import Success from "./pages/OtherPage/Success";
import UserProfiles from "./pages/UserProfiles";
import DashboardTables from "./pages/Tables/DashboardTables";
import DeleteUserTables from "./pages/Tables/DeleteUserTables";
import UserTables from "./pages/Tables/UserTables";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import ScrollToTop from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResetPassword from "./pages/AuthPages/ResetPassword";
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

          </Route>

          {/* Auth Layout */}
          <Route path="/admin-signin" element={<AdminSignIn />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />

          <Route path="/user-signin" element={<UserSignIn />} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error-server" element={<ErrorServer />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;