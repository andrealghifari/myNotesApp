import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth, db } from "../../libs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import noteImg from "../../assets/img/write-letter.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Notes from "../main/Notes";

const Register = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(`response create user:`, response);

      await setDoc(doc(db, "users", response.user.uid), {
        username,
        email,
        id: response.user.uid,
      });

      await setDoc(doc(db, "notes", response.user.uid), {
        notes: [],
      });

      navigate("/", { state: { registered: "success" } });
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Invalid Email format", {
            position: "bottom-right",
            autoClose: 3000,
          });
          break;

        default:
          toast.error(error.message, {
            position: "bottom-right",
            autoClose: 3000,
          });
          break;
      }
    }
  };
  return (
    <>
      {currentUser ? (
        <Notes />
      ) : (
        <div className="register">
          <div className="item">
            <div className="icons">
              <img src={noteImg} alt="" />
              <span>MyNotes .</span>
            </div>
            <h3>Let's create an account!</h3>
            <form onSubmit={handleRegister}>
              <input type="text" name="username" placeholder="Username" />
              <input type="email" name="email" placeholder="E-mail" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
