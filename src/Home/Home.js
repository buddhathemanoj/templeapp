// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { useNavigate } from "react-router-dom/dist";
// import Button from "@mui/material/Button";
// import Logo from '../Assets/lord-murugan-clipart-png.png'
// import { ToastContainer, toast } from 'react-toastify';
// import { submitFormData } from "../firebaseutils";
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';

// const Home = () => {
//   const navigate = useNavigate();
//   const [formdata, setFormdata] = useState({
//     name: "",
//     email: "",
//     noofpersons: "",

//   });
//   const [checked, setChecked] = useState(false);
//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (checked && formdata.name !== "" && formdata.email !== "" && formdata.noofpersons !== "") {
//       navigate("/bookticket", {
//         state: {
//           name: formdata.name,
//           email: formdata.email,
//           noofpersons: formdata.noofpersons,
//         },
//       });
//     } else {
//       toast.error("Please fill the Input Field and agree to the terms and conditions");
//     }
//   };


//   return (
//     <div className="backimg">
//       <h2 className="custom-logo-head">ARLUMIGU THANDAYUTHAPANI KOVIL</h2>
//       <div>
//         <img src={Logo} alt="murugan" style={{ width: '180px', height: '230px' }} />
//       </div>
//       <div>
//         <Box
//           display="flex"
//           flexDirection="column"
//           component="form"
//           sx={{
//             "& .MuiTextField-root": { m: 1, width: "100%" }, padding: '0 15px'

//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <TextField
//             id="outlined-multiline-flexible"
//             label="Name"
//             multiline
//             maxRows={6}
//             onChange={(e) => {
//               setFormdata({ ...formdata, name: e.target.value });
//             }}
//           />
//           <TextField
//             id="outlined-multiline-flexible"
//             label="Email"
//             multiline
//             type="email"
//             maxRows={6}
//             onChange={(e) => {
//               setFormdata({ ...formdata, email: e.target.value });
//             }}
//           />
//           <TextField
//             id="outlined-multiline-flexible"
//             label="No of Persons"
//             multiline
//             maxRows={6}
//             onChange={(e) => {
//               setFormdata({ ...formdata, noofpersons: e.target.value });
//             }}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 style={{ float: 'left', paddingLeft: '20px' }}
//                 aria-label="Terms and conditions"
//                 checked={checked}
//                 onChange={handleChange}
//               />
//             }
//             label="I agree to the terms and conditions"
//           />
//           <div style={{ paddingLeft: "7px", width: "100%" }}>
//             <Button
//               style={{ width: "100%" }} // Set width to 100% for the button
//               variant="contained"
//               onClick={handleSubmit}
//             >
//               Submit
//             </Button>
//           </div>
//           <ToastContainer />
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom/dist";
import Button from "@mui/material/Button";
import Logo from '../Assets/lord-murugan-clipart-png.png'
import { ToastContainer, toast } from 'react-toastify';
import { submitFormData } from "../firebaseutils";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Home = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    noofpersons: "",
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const isValidEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidNoOfPersons = (noofpersons) => {
    // Validate if noofpersons is a positive integer
    return /^\d+$/.test(noofpersons) && parseInt(noofpersons, 10) > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, noofpersons } = formdata;

    if (
      
      name.trim() !== "" &&
      isValidEmail(email) &&
      isValidNoOfPersons(noofpersons)
    ) {
      navigate("/bookticket", {
        state: {
          name,
          email,
          noofpersons,
        },
      });
    } else {
      toast.error("Please fill the Input Field correctly and agree to the terms and conditions");
    }
  };

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
            label="Name -  பெயர்"
            multiline
            maxRows={6}
            onChange={(e) => {
              setFormdata({ ...formdata, name: e.target.value });
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Email - மின்னஞ்சல்"
            multiline
            type="email"
            maxRows={6}
            onChange={(e) => {
              setFormdata({ ...formdata, email: e.target.value });
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Phone Number - தொலைபேசி எண்"
            multiline
            type="number"
            maxRows={6}
            onChange={(e) => {
              setFormdata({ ...formdata, noofpersons: e.target.value });
            }}
          />
          {/* <FormControlLabel
            control={
              <Checkbox
                style={{ float: 'left', paddingLeft: '15px' }}
                aria-label="Terms and conditions"
                checked={checked}
                onChange={handleChange}
              />
            }
            label="I agree to the terms and conditions"
          /> */}
          <div style={{  width: "100%" }}>
            <Button
              style={{ width: "100%" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Proceed
            </Button>
          </div>
          <br/>
          <ToastContainer />
        </Box>
      </div>
    </div>
  );
};

export default Home;
