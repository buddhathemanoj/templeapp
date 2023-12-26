import React from 'react'
import Logo from '../Assets/lord-murugan-clipart-png.png'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';


const ForgotPassword = () => {
  return (
     <div className="backimg">
      <h2 className="custom-logo-head">ARLUMIGU THANDAYUTHAPANI KOVIL</h2>
      <h2 className="custom-logo-head">அருள்மிகு தண்டாயுதபாணி கோவில்</h2>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center", marginBottom:"16px"}}>
        <img src={Logo} alt="murugan" style={{ width: '180px', height: '230px' }} />
      </div>
      <div>
        <Box
          display="flex"
          flexDirection="column"
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%" ,mb:1}, padding: '0 10px'
          }}
          noValidate
          autoComplete="off"
        >
         
          <TextField
            id="outlined-multiline-flexible"
            label="Email - மின்னஞ்சல்"
            multiline
            type="email"
            maxRows={6}
          />
        
          <div style={{  width: "100%" }}>
            <Button
              style={{ width: "100%" }}
              variant="contained"
            >
              Send Instruction
            </Button>
          </div>
          <br/>
          <ToastContainer />
        </Box>
      </div>
    </div>
  )
}

export default ForgotPassword