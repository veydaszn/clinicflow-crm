import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    total_patients: 0,
    total_appointments: 0,
    upcoming: 0,
    revenue: 0
  });

  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");

    // Fetch dashboard summary
    fetch("http://127.0.0.1:8000/api/dashboard/summary/", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setSummary(data));

    // Fetch recent appointments
    fetch("http://127.0.0.1:8000/api/appointments/?limit=5", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setRecentAppointments(data));
  }, []);

  // Chart sample data
  const chartData = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 25 },
    { month: "Apr", count: 22 }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Patients" value={summary.total_patients} />
        <Card title="Appointments" value={summary.total_appointments} />
        <Card title="Upcoming" value={summary.upcoming} />
        <Card title="Revenue" value={`$${summary.revenue}`} />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl mb-4 font-semibold">Monthly Appointments</h2>

        <div className="w-full h-72">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl mb-4 font-semibold">Recent Appointments</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Purpose</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentAppointments.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{a.patient_name}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.purpose}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded text-white ${
                      a.status === "scheduled"
                        ? "bg-green-600"
                        : a.status === "cancelled"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {a.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

// Reusable card component
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col">
      <span className="text-gray-500 text-sm">{title}</span>
      <span className="text-3xl font-semibold mt-2">{value}</span>
    </div>
  );
}
