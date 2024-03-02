import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import { useEffect, useState } from "react";
import { Alert } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../../configs";
import { useDispatch } from "react-redux";
import { LoginUser, reset } from "../../features/authslice";
import { useSelector } from "react-redux";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const handleLogin = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [alert, setAlert] = useState({
    status: isError,
    message: message,
    type: "failure",
  });

  useEffect(() => {
    if (user || isSuccess) {
      if (user.role.includes(5)) {
        navigate("/form-participant");
      } else {
        navigate("/");
      }
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(LoginUser(form));
      setAlert({ status: isError, message: message, type: "failure" });
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error("Error:", error);
    }
  };
  return (
    <>
      {alert.status && (
        <Alert color={alert.type}>
          <span className="font-medium">Info!</span> {alert.message}
        </Alert>
      )}

      <form onChange={handleLogin} onSubmit={handleSubmit} className="mt-5">
        <InputForm
          label="Username"
          name="username"
          type="username"
          placeholder="Username"
        ></InputForm>
        <InputForm
          label="Password"
          name="password"
          type="password"
          placeholder="******"
        ></InputForm>
        <Button
          variant="bg-blue-600 w-full"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default FormLogin;
