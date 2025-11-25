
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");

  const handleFindJobs = () => navigate("/find-jobs");

  const handleForEmployers = () => {
    if (isAuthenticated && user?.role === "employer") {
      navigate("/employer-dashboard");
    } else {
      navigate("/signin");
    }
  };

  const handleDashboardClick = () => {
    if (!user) return navigate("/signin");

    if (user.role === "employer") navigate("/employer-dashboard");
    else navigate("/jobseeker/dashboard");
  };

  const handleLogin = () => navigate("/signin");
  const handleSignup = () => navigate("/signup");
}
export default Header;    