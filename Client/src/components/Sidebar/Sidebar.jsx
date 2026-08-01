import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { FaHome, FaUniversity, FaExchangeAlt, FaMoneyBillWave, FaArrowDown, FaArrowUp, FaChartBar, FaBook, FaSignOutAlt } from "react-icons/fa";

const menus = [
  { icon: <FaHome />, title: "Dashboard", to: "/dashboard" },
  { icon: <FaUniversity />, title: "Accounts", to: "/accounts" },
  { icon: <FaArrowDown />, title: "Deposit", to: "/deposit" },
  { icon: <FaArrowUp />, title: "Withdraw", to: "/withdraw" },
  { icon: <FaMoneyBillWave />, title: "Transfer", to: "/transfer" },
  { icon: <FaExchangeAlt />, title: "Transactions", to: "/transactions" },
  { icon: <FaBook />, title: "Passbook", to: "/passbook" },
  { icon: <FaChartBar />, title: "Analytics", to: "/analytics" },
];

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const logout = () => {
    logoutUser();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return <aside className="w-64 min-w-[256px] bg-[#111827] text-white flex flex-col justify-between border-r border-slate-800">
    <div>
      <div className="p-8"><h1 className="text-3xl font-bold text-violet-500">ES Bank</h1><p className="mt-2 text-sm text-gray-400">Event Source Bank</p></div>
      <nav className="space-y-2 px-4">
        {menus.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition hover:bg-violet-600 ${isActive ? "bg-violet-600" : ""}`}>
          <span className="text-lg">{item.icon}</span><span>{item.title}</span>
        </NavLink>)}
        <button onClick={logout} className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition hover:bg-red-600"><FaSignOutAlt /><span>Logout</span></button>
      </nav>
    </div>
    <div className="border-t border-slate-700 p-6"><h2 className="font-semibold">{user.name || "Customer"}</h2><p className="text-sm text-gray-400">Customer</p></div>
  </aside>;
}

export default Sidebar;