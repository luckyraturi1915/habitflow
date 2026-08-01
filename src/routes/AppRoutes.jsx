import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Habits from "../pages/Habits";
import Backlog from "../pages/Backlog";
import Goals from "../pages/Goals";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

export default function AppRoutes({ user }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard user={user} />}
      />

      <Route
        path="/habits"
        element={<Habits user={user} />}
      />

      <Route
        path="/backlog"
        element={<Backlog user={user} />}
      />

      <Route
        path="/goals"
        element={<Goals user={user} />}
      />

      <Route
        path="/analytics"
        element={<Analytics user={user} />}
      />

      <Route
        path="/settings"
        element={<Settings user={user} />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}