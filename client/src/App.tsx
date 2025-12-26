import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FeedbackForm from "./pages/FeedbackForm";
import AdminDashboard from "./pages/Dashboard";
import Error from "./pages/Error";

const UserIdentity = () => {
  const userStatus = localStorage.getItem("role");
  const path = useLocation();
  const trailingPart = path.pathname.substring(
    path.pathname.lastIndexOf("/") + 1
  );
  console.log(trailingPart);
  if (
    userStatus == "USER" ||
    (userStatus == "ADMIN" && trailingPart == "feedbackform")
  ) {
    return <FeedbackForm />;
  } else if (userStatus == "ADMIN" && trailingPart == "admindashboard") {
    return <AdminDashboard />;
  } else {
    return (
      <Error
        nameOfError="Unauthorized"
        descriptionOfError="You do not have required access to view this page, login to view it"
      />
    );
  }
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feedbackform" element={<UserIdentity />} />
          <Route path="/admindashboard" element={<UserIdentity />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
