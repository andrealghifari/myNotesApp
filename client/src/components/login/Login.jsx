import React, { useEffect } from "react";
import noteImg from "../../assets/img/write-letter.png";
import { auth, db } from "../../libs/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, replace, useLocation, useNavigate } from "react-router-dom";
import Alert from "../alert/Alert";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../libs/state/userStore";
import Notes from "../main/Notes";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const statusRegistered = location?.state?.registered;

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = credential.user;

      //dispatch action to fetchUserInfo to send uid
      dispatch(fetchUserInfo(userData.uid));
      navigate("/notes");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid Credential User", {
            position: "bottom-right",
            autoClose: 3000,
          });
          break;
        default:
          toast.error("Internal server error, please try again later", {
            position: "bottom-right",
            autoClose: 3000,
          });
          break;
      }
    }
  };

  // USE EFFECT LIST
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchUserInfo(user?.uid));
      }
    });

    return () => {
      unsub();
    };
  }, [dispatch]);
  useEffect(() => {
    if (location?.state?.registered) {
      toast.success("Registration success! please Sign In", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
    navigate(location.pathname, { replace: true });
  }, [statusRegistered, location.pathname, navigate]);
  return (
    <>
      {currentUser ? <Navigate to={"/notes"} replace/>  : (
        <div className="login">
          <Alert />
          <div className="item">
            <div className="icons">
              <img src={noteImg} alt="" />
              <span>MyNotes .</span>
            </div>
            <h3>Welcome Back,</h3>
            <form onSubmit={handleLogin}>
              <input type="email" name="email" placeholder="Enter your email" />
              <input
                type="password"
                name="password"
                id=""
                placeholder="Password"
              />
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
      )}
    </>
  );
};

export default Login;
