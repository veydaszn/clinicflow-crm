import { useEffect, useState } from "react";
import axios from "axios";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  date_of_birth: string;
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    date_of_birth: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const API = "http://127.0.0.1:8000/api/patients/";

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new patient
  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(API, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        date_of_birth: "",
      });
      fetchPatients();
    } catch (err) {
      console.log("Add Error:", err);
    }
  };

  // Edit patient
  const startEdit = (patient: Patient) => {
    setEditingId(patient.id);
    setForm({ ...patient });
  };

  // Save edited patient
  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(`${API}${editingId}/`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEditingId(null);
      setForm({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        date_of_birth: "",
      });
      fetchPatients();
    } catch (err) {
      console.log("Update Error:", err);
    }
  };

  // Delete patient
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this patient?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchPatients();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>

      {/* Form */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="font-semibold mb-3">
          {editingId ? "Edit Patient" : "Add New Patient"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded"
          />
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 rounded col-span-2"
          />
          <input
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
            className="border p-2 rounded col-span-2"
          />
        </div>

        <button
          onClick={editingId ? handleUpdate : handleAdd}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editingId ? "Save Changes" : "Add Patient"}
        </button>
      </div>

      {/* Patient List */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="font-semibold mb-3">Patient List</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td className="border p-2">
                    {p.first_name} {p.last_name}
                  </td>
                  <td className="border p-2">{p.phone}</td>
                  <td className="border p-2">{p.email}</td>
                  <td className="border p-2 flex space-x-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
