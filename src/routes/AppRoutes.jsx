import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

export default function AppRoutes({ user }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard user={user} />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}