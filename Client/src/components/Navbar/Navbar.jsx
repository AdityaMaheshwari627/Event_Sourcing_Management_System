import {
  FaSearch,
  FaBell,
  FaMoon,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const logout = () => {
    logoutUser();
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <header className="h-20 bg-[#0F172A] border-b border-slate-800 px-8 flex items-center justify-between">

      <div className="relative w-[420px]">

        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#1E293B] rounded-full pl-11 pr-4 py-3 text-white outline-none focus:ring-2 focus:ring-violet-500"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="text-white text-2xl hover:text-violet-400 transition">
          <FaMoon />
        </button>

        <button className="text-white text-2xl hover:text-violet-400 transition relative">
          <FaBell />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button onClick={logout} title="Logout" className="flex items-center gap-3 text-left">

          <FaUserCircle className="text-5xl text-blue-500" />

          <div>

            <h3 className="text-white font-bold">
              {user.name || "Customer"}
            </h3>

            <p className="text-gray-400 text-sm">
              Customer
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}

export default Navbar;
