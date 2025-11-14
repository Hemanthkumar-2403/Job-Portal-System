import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  // ❌ If user is not logged in, redirect immediately
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  // ✔️ Handle logout button click
  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    // thunk succeeded
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Logged out successfully!");
      navigate("/signin");
    }

    // thunk failed
    if (result.meta.requestStatus === "rejected") {
toast.error(result.payload || "Logout failed");
    }
  };

  // If user is not logged in → don't show UI
  if (!user) return null;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold disabled:opacity-60"
        >
          {loading ? "Logging out..." : "Yes, Logout"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Logout;
