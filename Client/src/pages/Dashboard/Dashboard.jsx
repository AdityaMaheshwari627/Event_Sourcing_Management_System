import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAccounts, getEvents } from "../../services/accountService";
import toast from "react-hot-toast";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    Promise.all([getAccounts(), getEvents()]).then(([accountData, eventData]) => { setAccounts(accountData.accounts || []); setEvents(eventData.events || []); }).catch((error) => toast.error(error.response?.data?.message || "Unable to load dashboard")).finally(() => setLoading(false));
  }, []);
  const balance = accounts.reduce((total, account) => total + Number(account.balance || 0), 0);
  return <DashboardLayout><section className="text-white">
    <p className="text-violet-400 font-semibold uppercase tracking-wider">Event Source Banking System</p><h1 className="text-5xl font-bold mt-3">Dashboard</h1><p className="text-gray-400 mt-3">Your real-time account overview.</p>
    {loading ? <p className="py-16">Loading your accounts...</p> : <>
      <div className="mt-8 rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 p-8 shadow-2xl"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="uppercase tracking-[4px] text-violet-200 text-sm">Total available balance</p><h2 className="text-5xl font-extrabold mt-3">{money.format(balance)}</h2><p className="text-violet-100 mt-2">Across {accounts.length} account{accounts.length === 1 ? "" : "s"}</p></div><button onClick={() => navigate("/transfer")} className="bg-white text-violet-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-100">Transfer Money</button></div></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"><div className="rounded-3xl bg-[#111827] p-6"><p className="text-gray-400">Accounts</p><p className="text-4xl font-bold mt-2">{accounts.length}</p></div><div className="rounded-3xl bg-[#111827] p-6"><p className="text-gray-400">Transactions</p><p className="text-4xl font-bold mt-2">{events.length}</p></div><div className="rounded-3xl bg-[#111827] p-6"><p className="text-gray-400">Latest activity</p><p className="text-lg font-semibold mt-3">{events[0]?.eventType?.replaceAll("_", " ") || "No activity yet"}</p></div></div>
      <div className="mt-8 rounded-3xl bg-[#111827] p-6"><div className="flex justify-between"><h2 className="text-2xl font-bold">Recent Transactions</h2><button onClick={() => navigate("/transactions")} className="text-violet-400">View all</button></div><div className="mt-4 space-y-3">{events.slice(0, 5).map((event) => <div key={event._id} className="flex justify-between border-b border-slate-700 pb-3"><span>{event.eventType.replaceAll("_", " ")}</span><span>{event.payload.amount ? money.format(event.payload.amount) : "Account created"}</span></div>)}{!events.length && <p className="text-gray-400">No transactions yet.</p>}</div></div>
    </>}</section></DashboardLayout>;
}
export default Dashboard;
