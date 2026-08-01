import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FaUniversity, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  getAccounts,
  createAccount,
} from "../../services/accountService";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAccounts = async () => {
    try {
      const res = await getAccounts();
      setAccounts(res.accounts || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load accounts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleCreateAccount = async () => {
    try {
      const accountType = window.prompt(
        "Enter Account Type (Saving/Current)",
        "Saving"
      );

      if (!accountType) return;

      const res = await createAccount({
        accountType,
      });

      toast.success(res.message);

      loadAccounts();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to create account"
      );
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            My Accounts
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all your bank accounts
          </p>

        </div>

        <button
          onClick={handleCreateAccount}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
        >
          <FaPlus />
          Create Account
        </button>

      </div>

      {loading ? (

        <div className="text-center text-white py-20">
          Loading...
        </div>

      ) : accounts.length === 0 ? (

        <div className="rounded-3xl bg-[#111827] p-10 text-center text-gray-400">
          No Account Found
        </div>

      ) : (

        <div className="grid gap-6 lg:grid-cols-3">

          {accounts.map((account) => (

            <div
              key={account._id}
              className="rounded-3xl bg-[#111827] p-6 shadow-xl"
            >

              <div className="flex items-center justify-between">

                <FaUniversity className="text-5xl text-violet-500" />

                <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
                  {account.status}
                </span>

              </div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                {account.accountType}
              </h2>

              <p className="mt-2 text-gray-400">
                {account.accountNumber}
              </p>

              <h1 className="mt-6 text-4xl font-bold text-white">
                ₹ {account.balance}
              </h1>

            </div>

          ))}

        </div>

      )}

    </DashboardLayout>
  );
}

export default Accounts;