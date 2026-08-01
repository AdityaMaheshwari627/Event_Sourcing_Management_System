import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { depositMoney, getAccounts } from "../../services/accountService";
import toast from "react-hot-toast";

function Deposit() {
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
    } catch (err) {
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
      const res = await depositMoney({
        accountId: formData.accountId,
        amount: Number(formData.amount),
      });

      toast.success(res.message);

      setFormData({
        accountId: formData.accountId,
        amount: "",
      });

      loadAccounts();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Deposit Failed"
      );
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-white mb-8">
        Deposit Money
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] p-8 rounded-3xl max-w-xl space-y-6"
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
          value={formData.amount}
          onChange={handleChange}
          placeholder="Deposit Amount"
          className="w-full p-4 rounded-xl bg-[#1F2937] text-white"
        />

        <button
          className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-white font-semibold"
        >
          Deposit Money
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Deposit;