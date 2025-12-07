import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios"; // Axios instance

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";


export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      await api.post("/auth/register/", {
        username,
        email,
        password,
      });

      // Navigate to login after successful registration
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardContent className="pt-6">
          <h2 className="text-xl mb-4 font-semibold text-center">Register</h2>

          {error && (
            <p className="bg-red-200 text-red-700 p-2 rounded mb-3">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2"
              required
            />

            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2"
              required
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              required
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
