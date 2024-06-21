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
import FormUserAdd from "./pages/DashboardPage/UsersPage/CreateUserPage/index";
import CreateBulkUserPage from "./pages/DashboardPage/UsersPage/CreateBulkUserPage/index.jsx";
import ListUjianPage from "./pages/DashboardPage/UjianPage/ListUjianPage/index.jsx";
import CreateUjianPage from "./pages/DashboardPage/UjianPage/CreateUjianPage/index.jsx";
import DBoardPage from "./pages/DashboardPage/DBoardPage/index.jsx";
import ResultPage from "./pages/DashboardPage/ResultPage/index.jsx";

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
  {
    path: "/add-user",
    element: <FormUserAdd />,
  },
  {
    path: "/bulk-add-user",
    element: <CreateBulkUserPage />,
  },
  {
    path: "/ujian",
    element: <ListUjianPage />,
  },
  {
    path: "/add-ujian",
    element: <CreateUjianPage />,
  },
  {
    path: "/result",
    element: <ResultPage />,
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
