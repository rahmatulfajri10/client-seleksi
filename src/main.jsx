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
import { persistor, store } from "./app/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import ProctorPage from "./pages/DashboardPage/ProctorPage/index.jsx";
import ListUserPage from "./pages/DashboardPage/UsersPage/ListUserPage/index.jsx";

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
  {
    path: "/participant",
    element: <DashboardParticipant />,
  },
  {
    path: "/form-participant",
    element: <FormParticipant />,
  },
  {
    path: "/quiz/:kd_soal",
    element: <QuizPage />,
  },
  {
    path: "/proctor",
    element: <ProctorPage />,
  },
  {
    path: "/users",
    element: <ListUserPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
