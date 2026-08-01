import DashboardLayout from "../../layouts/DashboardLayout";
import SummaryCard from "../../components/SummaryCards/SummaryCard";
import BalanceChart from "../../components/Charts/BalanceChart";

import {
  FaBolt,
  FaDatabase,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";

const recentEvents = [
  ["Account Created", "ACC-10231", "Just now"],
  ["Deposit", "₹25,000", "5 min ago"],
  ["Money Transfer", "₹8,500", "18 min ago"],
  ["Withdrawal", "₹3,000", "40 min ago"],
];

function Dashboard() {
  return (
    <DashboardLayout>
      <section className="text-white">

        {/* Header */}

        <div className="mb-8">

          <p className="text-violet-400 font-semibold uppercase tracking-wider">
            Event Source Banking System
          </p>

          <h1 className="text-5xl font-bold mt-3">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-3">
            Monitor all banking activities in real time.
          </p>

        </div>

        {/* Primary Account */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 p-8 shadow-2xl mb-10">

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">

            <div>

              <p className="uppercase tracking-[4px] text-violet-200 text-sm">
                Primary Account
              </p>

              <h2 className="text-6xl font-extrabold mt-3">
                ₹2,48,520
              </h2>

              <p className="text-violet-100 mt-2">
                Available Balance
              </p>

              <div className="flex flex-wrap gap-12 mt-8">

                <div>

                  <p className="text-violet-200 text-sm">
                    Account Number
                  </p>

                  <h3 className="font-semibold text-xl">
                    **** **** 4832
                  </h3>

                </div>

                <div>

                  <p className="text-violet-200 text-sm">
                    IFSC
                  </p>

                  <h3 className="font-semibold text-xl">
                    ESBK0001234
                  </h3>

                </div>

              </div>

            </div>

            <button className="bg-white text-violet-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition">

              Transfer Money

            </button>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <SummaryCard
            title="Events Today"
            amount="12840"
            change="+18.4%"
            icon={<FaBolt />}
            color="bg-violet-600"
          />

          <SummaryCard
            title="Active Accounts"
            amount="386"
            change="+24"
            icon={<FaLayerGroup />}
            color="bg-blue-600"
          />

          <SummaryCard
            title="Transactions"
            amount="2248"
            change="+99%"
            icon={<FaDatabase />}
            color="bg-cyan-600"
          />

          <SummaryCard
            title="Success Rate"
            amount="99.98%"
            change="Healthy"
            icon={<FaCheckCircle />}
            color="bg-green-600"
          />

        </div>
                {/* Charts */}

        <div className="grid xl:grid-cols-3 gap-6 mt-10">

          <div className="xl:col-span-2 bg-[#111827] rounded-3xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-6">
              Monthly Transaction Volume
            </h2>

            <BalanceChart />

          </div>

          <div className="bg-[#111827] rounded-3xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-6">
              System Status
            </h2>

            <div className="space-y-6">

              <div>

                <div className="flex justify-between mb-2">

                  <span>Database</span>

                  <span>100%</span>

                </div>

                <div className="w-full h-2 rounded-full bg-gray-700">

                  <div className="w-full h-2 rounded-full bg-green-500"></div>

                </div>

              </div>

              <div>

                <div className="flex justify-between mb-2">

                  <span>API Health</span>

                  <span>99%</span>

                </div>

                <div className="w-full h-2 rounded-full bg-gray-700">

                  <div
                    className="h-2 rounded-full bg-cyan-500"
                    style={{ width: "99%" }}
                  ></div>

                </div>

              </div>

              <div>

                <div className="flex justify-between mb-2">

                  <span>Server Load</span>

                  <span>92%</span>

                </div>

                <div className="w-full h-2 rounded-full bg-gray-700">

                  <div
                    className="h-2 rounded-full bg-violet-500"
                    style={{ width: "92%" }}
                  ></div>

                </div>

              </div>

              <div>

                <div className="flex justify-between mb-2">

                  <span>Security</span>

                  <span>100%</span>

                </div>

                <div className="w-full h-2 rounded-full bg-gray-700">

                  <div className="w-full h-2 rounded-full bg-emerald-500"></div>

                </div>

              </div>

            </div>

          </div>

        </div>
                {/* Recent Transactions */}

        <div className="mt-10 rounded-3xl bg-[#111827] p-6 shadow-xl">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Recent Transactions
              </h2>

              <p className="mt-1 text-gray-400">
                Latest banking activities
              </p>

            </div>

            <button className="rounded-lg border border-violet-500 px-4 py-2 text-violet-400 transition hover:bg-violet-600 hover:text-white">
              View All
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-700 text-gray-300">

                  <th className="py-4 text-left">
                    Transaction
                  </th>

                  <th className="py-4 text-left">
                    Amount
                  </th>

                  <th className="py-4 text-left">
                    Time
                  </th>

                  <th className="py-4 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentEvents.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-[#1f2937] transition"
                  >

                    <td className="py-5 font-medium">
                      {item[0]}
                    </td>

                    <td className="font-semibold">
                      {item[1]}
                    </td>

                    <td className="text-gray-400">
                      {item[2]}
                    </td>

                    <td>

                      <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">

                        Success

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>
    </DashboardLayout>
  );
}

export default Dashboard;