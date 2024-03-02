import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import ErrorPage from "./pages/404.jsx";
import Dashboard from "./pages/dashboard.jsx";
import DashboardParticipant from "./pages/ParticipantPage/DashboardPage/index.jsx";
import FormParticipant from "./pages/ParticipantPage/FormParticipant/index.jsx";
import QuizPage from "./pages/ParticipantPage/QuizPage/index.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  ss

  {
    path: "/participant",
    element: <DashboardParticipant />,
  },
  {
    path: "/form-participant",
    element: <FormParticipant />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
