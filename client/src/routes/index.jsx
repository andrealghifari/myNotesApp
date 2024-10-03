import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
};

export default AppRoutes;
