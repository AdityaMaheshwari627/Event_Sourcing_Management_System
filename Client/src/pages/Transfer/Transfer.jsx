import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAccounts,
  transferMoney,
} from "../../services/accountService";
import toast from "react-hot-toast";

function Transfer() {
  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    senderId: "",
    receiverId: "",
    amount: "",
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await getAccounts();

      setAccounts(res.accounts);

      if (res.accounts.length > 1) {
        setFormData({
          senderId: res.accounts[0]._id,
          receiverId: res.accounts[1]._id,
          amount: "",
        });
      }
    } catch (error) {
      toast.error("Unable to load accounts");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senderId === formData.receiverId) {
      return toast.error(
        "Sender and Receiver cannot be same"
      );
    }

    try {
      const res = await transferMoney({
        senderId: formData.senderId,
        receiverId: formData.receiverId,
        amount: Number(formData.amount),
      });

      toast.success(res.message);

      setFormData((prev) => ({
        ...prev,
        amount: "",
      }));

      loadAccounts();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Transfer Failed"
      );

    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-white mb-8">
        Transfer Money
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] rounded-3xl p-8 max-w-2xl space-y-6"
      >

        <div>

          <label className="text-white mb-2 block">
            Sender Account
          </label>

          <select
            name="senderId"
            value={formData.senderId}
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

        </div>

        <div>

          <label className="text-white mb-2 block">
            Receiver Account
          </label>

          <select
            name="receiverId"
            value={formData.receiverId}
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

        </div>

        <div>

          <label className="text-white mb-2 block">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            className="w-full p-4 rounded-xl bg-[#1F2937] text-white"
          />

        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-semibold"
        >
          Transfer Money
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Transfer;