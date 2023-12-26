import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Logo from "../Assets/lord-murugan-clipart-png.png";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseconfig";
import "./Signup.css";
import { submitSignup } from "../firebaseutils";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const userData = await submitSignup({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      console.log("User signed up successfully:", userData);

      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="backimg">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <img
          src={Logo}
          alt="murugan"
          style={{ width: "160px", height: "auto", marginTop: "16px" }}
        />
      </div>
      <Box
        display="flex"
        flexDirection="column"
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "100%" },
          padding: "0 10px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="Name - பெயர்"
          multiline
          maxRows={6}
          variant="outlined"
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          id="email"
          label="Email - மின்னஞ்சல்"
          multiline
          maxRows={6}
          variant="outlined"
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          id="phoneNumber"
          label="Phone Number - தொலைபேசி எண்"
          multiline
          maxRows={6}
          variant="outlined"
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          id="password"
          label="Password - கடவுச்சொல்"
          //   multiline
          maxRows={6}
          variant="outlined"
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          id="confirmPassword"
          label="Confirm Password - கடவுச்சொல்லை உறுதிப்படுத்தவும்"
          //   multiline
          maxRows={6}
          variant="outlined"
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <Button
          onClick={handleSubmit}
          style={{ width: "100%" }}
          variant="contained"
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default Signup;
