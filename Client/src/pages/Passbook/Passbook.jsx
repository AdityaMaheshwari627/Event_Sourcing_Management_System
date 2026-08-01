import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import toast from "react-hot-toast";

function Passbook() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPassbook();
  }, []);

  const loadPassbook = async () => {
    try {
      const res = await API.get("/replay");

      setEvents(res.data.events || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Unable to load passbook"
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-white text-3xl">
          Loading...
        </h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="text-4xl text-white font-bold mb-8">
        Event Passbook
      </h1>

      <div className="bg-[#111827] rounded-3xl p-6">

        <table className="w-full text-white">

          <thead>

            <tr className="border-b border-gray-700">

              <th className="py-3 text-left">
                Event
              </th>

              <th className="text-left">
                Version
              </th>

              <th className="text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {events.map((event) => (

              <tr
                key={event._id}
                className="border-b border-gray-800"
              >

                <td className="py-4">
                  {event.eventType}
                </td>

                <td>
                  {event.version}
                </td>

                <td>
                  {new Date(
                    event.createdAt
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Passbook;