import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import { getAccounts } from "../../services/accountService";
import toast from "react-hot-toast";

function Passbook() {
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const { accounts: userAccounts = [] } = await getAccounts();
        setAccounts(userAccounts);
        if (userAccounts[0]) setAccountId(userAccounts[0]._id);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load accounts");
      } finally {
        setLoading(false);
      }
    };
    loadAccounts();
  }, []);

  useEffect(() => {
    if (!accountId) {
      setEvents([]);
      return;
    }

    API.get(`/account/${accountId}/events`)
      .then(({ data }) => setEvents(data.events || []))
      .catch((error) => toast.error(error.response?.data?.message || "Unable to load passbook"));
  }, [accountId]);

  return (
    <DashboardLayout>
      <h1 className="text-4xl text-white font-bold mb-8">Event Passbook</h1>
      {loading ? <p className="text-white">Loading...</p> : (
        <>
          <select value={accountId} onChange={(event) => setAccountId(event.target.value)} className="mb-6 w-full max-w-md rounded-xl bg-[#1F2937] p-4 text-white">
            <option value="">Select an account</option>
            {accounts.map((account) => <option key={account._id} value={account._id}>{account.accountNumber}</option>)}
          </select>
          <div className="bg-[#111827] rounded-3xl p-6 overflow-x-auto">
            <table className="w-full text-white">
              <thead><tr className="border-b border-gray-700"><th className="py-3 text-left">Event</th><th className="text-left">Version</th><th className="text-left">Date</th></tr></thead>
              <tbody>{events.map((event) => <tr key={event._id} className="border-b border-gray-800"><td className="py-4">{event.eventType}</td><td>{event.version}</td><td>{new Date(event.createdAt).toLocaleString()}</td></tr>)}</tbody>
            </table>
            {!events.length && <p className="py-4 text-gray-400">No events found for this account.</p>}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Passbook;
