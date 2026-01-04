import { type ReactNode } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import FeedbackForm from "./pages/FeedbackForm";
import AdminDashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

const RequireAuth = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: ReactNode;
}) => {
  const role = localStorage.getItem("ROLE");
  const location = useLocation();

  if (!role) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!allowedRoles.includes(role)) {
    return (
      <Error
        nameOfError="Unauthorized"
        descriptionOfError="You do not have required access to view this page, login to view it"
      />
    );
  }

  return children;
};

function App() {
  /*
  In login and signup page we have to set locally user's role -> Admin or User
  signup,login,home page => for all
  feedback form page => can be viewed after logging in
  dashboard and export feature for admins only*
  */

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/feedbackform"
            element={
              <RequireAuth allowedRoles={["USER", "ADMIN"]}>
                <FeedbackForm />
              </RequireAuth>
            }
          />
          <Route
            path="/admindashboard"
            element={
              <RequireAuth allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element = {<NotFound/>} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
