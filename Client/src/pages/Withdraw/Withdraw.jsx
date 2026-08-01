import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { withdrawMoney, getAccounts } from "../../services/accountService";
import toast from "react-hot-toast";

function Withdraw() {
  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    accountId: "",
    amount: "",
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await getAccounts();

      setAccounts(res.accounts);

      if (res.accounts.length > 0) {
        setFormData((prev) => ({
          ...prev,
          accountId: res.accounts[0]._id,
        }));
      }
    } catch (error) {
      toast.error("Unable to load accounts");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await withdrawMoney({
        accountId: formData.accountId,
        amount: Number(formData.amount),
      });

      toast.success(res.message);

      setFormData({
        accountId: formData.accountId,
        amount: "",
      });

      loadAccounts();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Withdraw Failed"
      );
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-white mb-8">
        Withdraw Money
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] rounded-3xl p-8 max-w-xl space-y-6"
      >

        <select
          name="accountId"
          value={formData.accountId}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#1F2937] text-white"
        >

          {accounts.map((account) => (
            <option
              key={account._id}
              value={account._id}
            >
              {account.accountNumber}
            </option>
          ))}

        </select>

        <input
          type="number"
          name="amount"
          placeholder="Withdraw Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#1F2937] text-white"
        />

        <button
          className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Withdraw Money
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Withdraw;