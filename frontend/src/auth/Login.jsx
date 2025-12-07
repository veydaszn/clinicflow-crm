import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";


export default function Login() {
  const navigate = useNavigate(); // React Router hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await api.post("/auth/login/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate("/dashboard"); // ✅ SPA navigation
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardContent className="pt-6">
          <h2 className="text-xl mb-4 font-semibold">ClinicFlow Login</h2>

          <form onSubmit={login} className="space-y-3">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-3"
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600">
              Register
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
