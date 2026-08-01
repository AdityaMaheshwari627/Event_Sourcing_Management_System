import DashboardLayout from "../../layouts/DashboardLayout";
import BalanceChart from "../../components/Charts/BalanceChart";
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaWallet,
} from "react-icons/fa";

function Analytics() {
  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-gray-400 mt-2">
          Banking insights and transaction statistics.
        </p>

      </div>

      {/* Top Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <div className="bg-[#111827] rounded-3xl p-6 shadow-xl">

          <FaWallet className="text-violet-500 text-4xl" />

          <h2 className="text-white text-3xl font-bold mt-5">
            ₹2.48L
          </h2>

          <p className="text-gray-400 mt-2">
            Total Balance
          </p>

        </div>

        <div className="bg-[#111827] rounded-3xl p-6 shadow-xl">

          <FaArrowUp className="text-green-500 text-4xl" />

          <h2 className="text-white text-3xl font-bold mt-5">
            ₹85K
          </h2>

          <p className="text-gray-400 mt-2">
            Total Deposits
          </p>

        </div>

        <div className="bg-[#111827] rounded-3xl p-6 shadow-xl">

          <FaArrowDown className="text-red-500 text-4xl" />

          <h2 className="text-white text-3xl font-bold mt-5">
            ₹32K
          </h2>

          <p className="text-gray-400 mt-2">
            Withdrawals
          </p>

        </div>

        <div className="bg-[#111827] rounded-3xl p-6 shadow-xl">

          <FaChartLine className="text-cyan-500 text-4xl" />

          <h2 className="text-white text-3xl font-bold mt-5">
            +18%
          </h2>

          <p className="text-gray-400 mt-2">
            Monthly Growth
          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="bg-[#111827] rounded-3xl p-8 mt-8 shadow-xl">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl text-white font-bold">
              Monthly Banking Overview
            </h2>

            <p className="text-gray-400 mt-1">
              Deposits & Withdrawals Overview
            </p>

          </div>

        </div>

        <BalanceChart />

      </div>

      {/* Bottom Cards */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-[#111827] rounded-3xl p-6 shadow-xl">

          <h2 className="text-white text-2xl font-bold mb-5">
            Top Spending Categories
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span className="text-gray-300">
                Shopping
              </span>

              <span className="text-red-400">
                ₹12,000
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">
                Food
              </span>

              <span className="text-yellow-400">
                ₹8,500
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">
                Bills
              </span>

              <span className="text-cyan-400">
                ₹6,300
              </span>
            </div>

          </div>

        </div>

        <div className="bg-[#111827] rounded-3xl p-6 shadow-xl">

          <h2 className="text-white text-2xl font-bold mb-5">
            Banking Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-300">
                Transactions
              </span>

              <span className="text-white">
                2,846
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">
                Accounts
              </span>

              <span className="text-white">
                03
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">
                Transfers
              </span>

              <span className="text-white">
                187
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">
                Success Rate
              </span>

              <span className="text-green-400">
                99.9%
              </span>
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Analytics;