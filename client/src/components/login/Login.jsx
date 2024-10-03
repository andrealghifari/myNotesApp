import React, { useEffect } from "react";
import noteImg from "../../assets/img/write-letter.png";
import { auth, db } from "../../libs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import Alert from "../alert/Alert";
import { toast } from "react-toastify";

const Login = () => {
  const location = useLocation();
  const registered = location?.state?.registered;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    // const response = signInWithEmailAndPassword(auth, )
  };

  useEffect(() => {
    if (location.state.registered) {
      toast.success("Registration successful! please Sign In", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }, [location]);
  return (
    <div className="login">
      <Alert />
      <div className="item">
        <div className="icons">
          <img src={noteImg} alt="" />
          <span>myNotes.</span>
        </div>
        <h3>Welcome Back,</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Enter your email" />
          <input type="password" name="password" id="" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an account ? create{" "}
          <Link to={"/register"}>
            <span>here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
