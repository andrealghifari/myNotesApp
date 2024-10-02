import React from "react";
import noteImg from "../../assets/img/write-letter.png";
const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const {email, password} = Object.fromEntries(formData); 
    }
  return (
    <div className="login">
      <div className="item">
        <div className="icons">
          <img src={noteImg} alt="" />
          <span>myNotes.</span>
        </div>
        <h3>Welcome Back,</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Enter you email" />
          <input type="password" name="password" id="" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
