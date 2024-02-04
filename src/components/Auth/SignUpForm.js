import React, { useEffect, useState } from "react";
import "../../../css/SignUpForm.css";
import { DOMAIN_NAME, GET_INTERESTS, REGISTER_USER } from "../../constant";
import AllInterests from "../AllInterests";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [allInterests, setAllInterests] = useState([]);
  const [statusColor, setStatusColor] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpData = {
      username,
      email,
      password,
      interests,
      postal_address: address,
      phone_no: phoneNumber,
    };

    try {
      const response = await fetch(DOMAIN_NAME + REGISTER_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setInterests([]);
        setAddress("");
        setPhoneNumber("");
        setStatus("You signed up successfully");
        setStatusColor("green");
        navigate("/login");
      }

      if (!response.ok) {
        setStatus("Username or email already exist");
        setStatusColor("red");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  async function getAllInterests() {
    const data = await fetch(DOMAIN_NAME + GET_INTERESTS);
    const json = await data.json();
    setAllInterests(json.topic_names);
  }

  useEffect(() => {
    getAllInterests();
    return () => {};
  }, []);

  return (
    <>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1 style={{ color: "white" }}>Book Exchange | Sign up</h1>
          <p style={{ color: statusColor }}>{status}</p>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label>Interests:</label>

            {allInterests.map((data, index) => (
              <AllInterests
                interest={data}
                handleCheckboxChange={handleCheckboxChange}
                key={index}
              />
            ))}
          </div>
          <div className="form-group">
            <label>Postal Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
