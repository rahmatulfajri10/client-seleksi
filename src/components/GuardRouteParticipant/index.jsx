import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authslice";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function GuardRouteParticipant({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && !user.role.includes(5)) {
      navigate("/");
    }
  }, [isError, user]);
  return children || <Outlet />;
}
