import { useEffect, useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: "",
    date: "",
    time: "",
    purpose: ""
  });

  // Fetch appointments
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/appointments/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/appointments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((newItem) => {
        setAppointments([...appointments, newItem]);
        setIsModalOpen(false);
      });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
        >
          + New Appointment
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Purpose</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{a.patient_name}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.time}</td>
                <td className="p-3">{a.purpose}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">New Appointment</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Patient Name"
                className="w-full mb-3 p-2 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, patient_name: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full mb-3 p-2 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <input
                type="time"
                className="w-full mb-3 p-2 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Purpose"
                className="w-full mb-3 p-2 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, purpose: e.target.value })
                }
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
