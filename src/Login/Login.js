import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Login.css";
import Logo from "../Assets/lord-murugan-clipart-png.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../firebaseutils";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginClick = async () => {
    try {
      // Call the login function to verify email and password
      const user = await login(loginData);

      // If login is successful, navigate to "/bookticket" page
      toast.success("Login successful!");
      navigate("/bookticket");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="backimg">
      <h2 className="custom-logo-head">ARLUMIGU THANDAYUTHAPANI KOVIL</h2>
      <h2 className="custom-logo-head">அருள்மிகு தண்டாயுதபாணி கோவில்</h2>
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
          style={{ width: "180px", height: "230px" }}
        />
      </div>
      <div>
        <Box
          display="flex"
          flexDirection="column"
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%", mb: 1 },
            padding: "0 10px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="email"
            label="Email - மின்னஞ்சல்"
            multiline
            maxRows={6}
            required
            value={loginData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password - கடவுச்சொல்"
            type="password"
            maxRows={6}
            required
            value={loginData.password}
            onChange={handleChange}
          />
          <div style={{ width: "100%" }}>
            <Button
              style={{ width: "100%" }}
              variant="contained"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </div>
          <Link to="/forgotpassword" style={{ color: "blue" }}>
            Forget password?
          </Link>
          <br />
          <ToastContainer />
        </Box>
      </div>
    </div>
  );
};

export default Login;
