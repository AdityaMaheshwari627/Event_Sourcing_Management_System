import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getEvents } from "../../services/accountService";
import toast from "react-hot-toast";

function Transactions() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getEvents().then(({ events }) => setEvents(events || [])).catch((error) => toast.error(error.response?.data?.message || "Unable to load transactions")).finally(() => setLoading(false));
  }, []);
  return <DashboardLayout>
    <h1 className="text-4xl font-bold text-white mb-8">Transactions</h1>
    <div className="bg-[#111827] rounded-3xl p-6 overflow-x-auto">
      {loading ? <p className="text-white">Loading...</p> : <table className="w-full text-white"><thead><tr className="border-b border-gray-700"><th className="py-4 text-left">Type</th><th className="text-left">Amount</th><th className="text-left">Balance</th><th className="text-left">Date</th></tr></thead>
      <tbody>{events.map((event) => <tr key={event._id} className="border-b border-gray-800"><td className="py-5">{event.eventType.replaceAll("_", " ")}</td><td>₹ {event.payload.amount ?? "—"}</td><td>₹ {event.payload.newBalance ?? event.payload.balance ?? 0}</td><td>{new Date(event.createdAt).toLocaleString()}</td></tr>)}</tbody></table>}
      {!loading && !events.length && <p className="text-gray-400">No transactions yet. Create an account and make a deposit to begin.</p>}
    </div>
  </DashboardLayout>;
}
export default Transactions;
