import {
  FaHome,
  FaUniversity,
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaChartBar,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menus = [
    { icon: <FaHome />, title: "Dashboard" },
    { icon: <FaUniversity />, title: "Accounts" },
    { icon: <FaExchangeAlt />, title: "Transactions" },
    { icon: <FaMoneyCheckAlt />, title: "Transfer" },
    { icon: <FaChartBar />, title: "Analytics" },
    { icon: <FaUsers />, title: "Beneficiaries" },
    { icon: <FaCog />, title: "Settings" },
    { icon: <FaSignOutAlt />, title: "Logout" },
  ];

  return (
    <aside className="w-64 min-w-[256px] bg-[#111827] text-white flex flex-col justify-between border-r border-slate-800">

      <div>

        <div className="p-8">

          <h1 className="text-3xl font-bold text-violet-500">
            ES Bank
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Event Source Bank
          </p>

        </div>

        <div className="space-y-2 px-4">

          {menus.map((item, index) => (
            <button
              key={index}
              className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition hover:bg-violet-600"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.title}</span>
            </button>
          ))}

        </div>

      </div>

      <div className="border-t border-slate-700 p-6">

        <h2 className="font-semibold">
          Aditya Maheshwari
        </h2>

        <p className="text-sm text-gray-400">
          Premium User
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;