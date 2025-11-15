import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Task from "./pages/Task.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import TaskDetails from "./pages/TaskDetails.tsx";
import CompletedTasks from "./pages/CompletedTasks.tsx";
import PendingTasks from "./pages/PendingTasks.tsx";
import MyCompletedTasks from "./pages/MyCompletedTasks.tsx";
import { ProtectedRouteUser } from "./components/ProtectedRouteUser.tsx";
import { ProtectedRouteAdmin } from "./components/ProtectedRouteAdmin.tsx";
import AllTask from "./pages/AdminTasks.tsx";
import HighPriority from "./pages/HighPriority.tsx";
import LowPriority from "./pages/LowPriority.tsx";
import { TaskProvider } from "./contexts/TaskContext.tsx";
import UsersSummary from "./pages/UsersSummury.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/tasks",
        element: (
          <ProtectedRouteUser>
            <Task />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/tasks/completed",
        element: (
          <ProtectedRouteUser>
            <CompletedTasks />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/tasks/pending",
        element: (
          <ProtectedRouteUser>
            <PendingTasks />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/tasks/my-completed",
        element: (
          <ProtectedRouteUser>
            <MyCompletedTasks />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/tasks/:id",
        element: (
          <ProtectedRouteUser>
            <TaskDetails />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/tasks/all",
        element: (
          <ProtectedRouteAdmin>
            <AllTask />
          </ProtectedRouteAdmin>
        ),
      },
      {
        path: "/tasks/high",
        element: (
          <ProtectedRouteAdmin>
            <HighPriority />
          </ProtectedRouteAdmin>
        ),
      },
      {
        path: "/tasks/low",
        element: (
          <ProtectedRouteAdmin>
            <LowPriority />
          </ProtectedRouteAdmin>
        ),
      },
      {
        path: "/users/summury",
        element: (
          <ProtectedRouteAdmin>
            <UsersSummary />
          </ProtectedRouteAdmin>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);
