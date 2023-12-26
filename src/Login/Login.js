import React from 'react';
import TextField from "@mui/material/TextField";
import './Login.css';
import Logo from '../Assets/lord-murugan-clipart-png.png';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formdata, setFormdata] = React.useState({ name: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = (event) => {
    event.preventDefault();

    const { name, password } = formdata;

    if (name.trim() !== "" && password !== "") {
      navigate("/bookticket", {
        state: {
          name,
          password,
        },
      });
    } else {
      toast.error("Please fill the Input Field");
    }
  };

  return (
    <div className="backimg">
      <h2 className="custom-logo-head">ARLUMIGU THANDAYUTHAPANI KOVIL</h2>
      <h2 className="custom-logo-head">அருள்மிகு தண்டாயுதபாணி கோவில்</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }}>
        <img src={Logo} alt="murugan" style={{ width: '180px', height: '230px' }} />
      </div>
      <div>
        <Box
          display="flex"
          flexDirection="column"
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%", mb: 1 }, padding: '0 10px'
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Name -  பெயர்"
            multiline
            maxRows={6}
            required
            value={formdata.name}
            onChange={handleChange}
            name="name"
          />
          <TextField
            id="outlined-password-input"
            label="Password - கடவுச்சொல்"
            type="password"
            maxRows={6}
            required
            value={formdata.password}
            onChange={handleChange}
            name="password"
          />
          <div style={{ width: "100%" }}>
            <Button
              style={{ width: "100%" }}
              variant="contained"
              onClick={handleClick}
            >
              Login
            </Button>
            
          </div>
          <Link to='/forgotpassword' style={{ color: 'blue' }}>Forget password?</Link>
          <br />
          <ToastContainer />
        </Box>
      </div>
    </div>
  );
};

export default Login;
