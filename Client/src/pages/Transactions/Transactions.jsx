import DashboardLayout from "../../layouts/DashboardLayout";

const transactions = [
  {
    id: 1,
    type: "Deposit",
    amount: "₹25,000",
    account: "Savings",
    status: "Success",
    date: "01 Aug 2026",
  },
  {
    id: 2,
    type: "Withdraw",
    amount: "₹5,000",
    account: "Savings",
    status: "Success",
    date: "31 Jul 2026",
  },
  {
    id: 3,
    type: "Transfer",
    amount: "₹8,700",
    account: "Current",
    status: "Pending",
    date: "31 Jul 2026",
  },
  {
    id: 4,
    type: "Deposit",
    amount: "₹60,000",
    account: "Salary",
    status: "Success",
    date: "30 Jul 2026",
  },
];

function Transactions() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-white mb-8">
        Transactions
      </h1>

      <div className="bg-[#111827] rounded-3xl p-6">

        <table className="w-full text-white">

          <thead>

            <tr className="border-b border-gray-700">

              <th className="text-left py-4">ID</th>
              <th className="text-left">Type</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Account</th>
              <th className="text-left">Date</th>
              <th className="text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((item) => (

              <tr
                key={item.id}
                className="border-b border-gray-800 hover:bg-gray-900 transition"
              >

                <td className="py-5">{item.id}</td>
                <td>{item.type}</td>
                <td>{item.amount}</td>
                <td>{item.account}</td>
                <td>{item.date}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Success"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Transactions;