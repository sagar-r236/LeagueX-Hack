import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { DOMAIN_NAME, LOGIN_USER } from "../../constant";
import "../../../css/SignUpForm.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch(DOMAIN_NAME + LOGIN_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const data = await response.json();

        console.log(data.data.access_token);
        localStorage.setItem("token", data.data.access_token);
        navigate("/");
      }

      if (!response.ok) {
        setStatus("login credentials Incorrect");
        setStatusColor("red");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1 style={{ color: "white" }}>Book Exchange | Login</h1>
          <p style={{ color: statusColor }}>{status}</p>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
