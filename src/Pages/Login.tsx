
// src/pages/Login.tsx
import React, { useState } from "react";
import { useUserAuth } from "../context/user/userAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, useLocation } from "react-router-dom";



const Login: React.FC = () => {
  const { loginWithHouseNumber } = useUserAuth();
  const [isAdminTab, setIsAdminTab] = useState(false);
  const [houseNumber, setHouseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || (isAdminTab ? "/admin/dashboard" : "/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isAdminTab) {
        // Admin: sign in with email/password directly
        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      } else {
        // Family: sign in via house number
        await loginWithHouseNumber(houseNumber, password);
      }
      // After sign-in, onAuthStateChanged in context fetches role.
      // We can navigate here, but better: wait until role is set and then navigate via effect or check role in a useEffect.
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 ${!isAdminTab ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => { setIsAdminTab(false); setError(null); }}
        >
          Family Login
        </button>
        <button
          className={`flex-1 py-2 ${isAdminTab ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => { setIsAdminTab(true); setError(null); }}
        >
          Admin Login
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {!isAdminTab ? (
          <>
            <label className="block mb-1">House Number</label>
            <input
              type="text"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
              required
            />
          </>
        ) : (
          <>
            <label className="block mb-1">Admin Email</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
              required
            />
          </>
        )}
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
