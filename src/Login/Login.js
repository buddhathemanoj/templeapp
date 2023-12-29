import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Login.css";
import Logo from "../Assets/lord-murugan-clipart-png.png";
import { Modal, Typography, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../firebaseutils";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLoginClick = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const loggedInUser = await loginUser({ email, password });

      // Check if email is verified
      if (!loggedInUser.emailVerified) {
        setShowVerificationModal(true);
        console.log("Email not verified..!");
      } else {
        console.log("Login successful:", loggedInUser);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/bookticket");
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      // toast.error(`Login failed: ${error.message}`);
      if (error.message.includes("invalid-credential")) {
        toast.error("User not found. Please register.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowVerificationModal(false);
  };

  return (
    <div className="backimg">
      <h2 className="custom-logo-head">ARLUMIGU THANDAYUTHAPANI KOVIL</h2>
      <h2 className="custom-logo-head" style={{ paddingTop: "10px" }}>
        அருள்மிகு தண்டாயுதபாணி கோவில்
      </h2>
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
          style={{ width: "160px", height: "auto" }}
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            name="password"
            label="Password - கடவுச்சொல்"
            type="password"
            maxRows={6}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            error={!!passwordError}
            helperText={passwordError}
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
          <Link
            to="/forgotpassword"
            style={{ color: "blue", marginTop: "3px" }}
          >
            Forget password?
          </Link>
          <br />
        </Box>
      </div>
      <Modal
        open={showVerificationModal}
        onClose={handleCloseModal}
        aria-labelledby="email-verification-modal"
        aria-describedby="email-verification-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 3,
              right: 3,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="div" gutterBottom>
            Email Verification
          </Typography>
          <Typography sx={{ mt: 2 }} paragraph>
            Please verify your email before logging in.
          </Typography>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Login;
