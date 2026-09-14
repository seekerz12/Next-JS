"use client";
import { useState } from "react";

export default function UserManagementPage() {
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/user/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });

    if (res.ok) {
      setStatus("Password updated successfully!");
      setNewPassword("");
    } else {
      setStatus("Failed to update password.");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>User Management (Admin Only)</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <label>Change Password:</label>
        <br />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ padding: 8, margin: "10px 0" }}
        />
        <br />
        <button type="submit" style={{ padding: "8px 16px" }}>Save Password</button>
      </form>
      {status && <p style={{ marginTop: 15 }}>{status}</p>}
    </div>
  );
}