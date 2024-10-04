import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Notes from "../components/main/Notes";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/notes"
        element={!!currentUser ? <Notes /> : <Navigate to={"/"} />}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
