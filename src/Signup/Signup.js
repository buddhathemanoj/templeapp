import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Logo from "../Assets/lord-murugan-clipart-png.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signup } from "../firebaseutils";

const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate password and confirmPassword
      if (userData.password !== userData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Call signupSubmitData function to handle signup
      const user = await signup(userData);
      console.log("Signup successful:", user);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
      console.error("Signup error:", error.message);
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
          name="name"
          label="Name - பெயர்"
          multiline
          maxRows={6}
          variant="outlined"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          name="email"
          label="Email - மின்னஞ்சல்"
          multiline
          maxRows={6}
          variant="outlined"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <br />
        <div display="flex">
          <TextField
            // id="countryCode"
            value={"+60"}
            multiline
            maxRows={6}
            variant="outlined"
            style={{ width: "17%" }}
            disabled
          />
          <TextField
            name="phoneNumber"
            label="Phone Number - தொலைபேசி எண்"
            multiline
            maxRows={6}
            variant="outlined"
            value={userData.phoneNumber}
            onChange={handleChange}
            required
            style={{ width: "83%" }}
          />
        </div>
        <br />
        <TextField
          name="password"
          label="Password - கடவுச்சொல்"
          //   multiline
          maxRows={6}
          variant="outlined"
          type="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          name="confirmPassword"
          label="Confirm Password - கடவுச்சொல்லை உறுதிப்படுத்தவும்"
          //   multiline
          maxRows={6}
          variant="outlined"
          type="password"
          value={userData.confirmPassword}
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
        <ToastContainer />
      </Box>
    </div>
  );
};

export default Signup;
