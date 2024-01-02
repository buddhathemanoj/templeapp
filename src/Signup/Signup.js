// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import { Modal, Typography, Button, Box, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Logo from "../Assets/lord-murugan-clipart-png.png";
// import { useNavigate } from "react-router-dom";
// import { signupUser } from "../firebaseutils";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [openModal, setOpenModal] = useState(false);

//   const [nameError, setNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [phoneNumberError, setPhoneNumberError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");

//   const handleSignupClick = async () => {
//     setNameError("");
//     setEmailError("");
//     setPhoneNumberError("");
//     setPasswordError("");
//     setConfirmPasswordError("");

//     // Validate input fields
//     if (!name) {
//       setNameError("Name is required");
//       return;
//     }
//     if (!email) {
//       setEmailError("Email is required");
//       return;
//     }
//     if (!phoneNumber) {
//       setPhoneNumberError("Phone number is required");
//       return;
//     }
//     if (!password) {
//       setPasswordError("Password is required");
//       return;
//     }
//     if (!confirmPassword) {
//       setConfirmPasswordError("Confirm password is required");
//       return;
//     }

//     if (password.length < 6) {
//       setPasswordError("Password should be at least 6 characters long");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match");
//       return;
//     }

//     try {
//       const user = await signupUser({
//         name,
//         email,
//         phoneNumber,
//         password,
//         confirmPassword,
//       });
//       console.log("Signup successful:", user);
//       setOpenModal(true);
//     } catch (error) {
//       console.error("Signup error:", error.message);
//       if (error.message === "Passwords do not match") {
//         setConfirmPasswordError("Passwords do not match");
//       } else if (
//         error.message === "Password should be at least 6 characters long"
//       ) {
//         setPasswordError("Password should be at least 6 characters long");
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     navigate("/login");
//   };

//   return (
//     <div className="backimg">
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginBottom: "16px",
//         }}
//       >
//         <img
//           src={Logo}
//           alt="murugan"
//           style={{ width: "150px", height: "auto", marginTop: "16px" }}
//         />
//       </div>
//       <Box
//         display="flex"
//         flexDirection="column"
//         component="form"
//         sx={{
//           "& .MuiTextField-root": {
//             width: "100%",
//             marginBottom: "0px",
//           },
//           padding: "0 10px",
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <TextField
//           name="name"
//           label="Name - பெயர்"
//           multiline
//           maxRows={6}
//           variant="outlined"
//           value={name}
//           onChange={(e) => {
//             setName(e.target.value);
//             setNameError("");
//           }}
//           required
//           error={!!nameError}
//           helperText={nameError}
//         />
//         <br />
//         <TextField
//           name="email"
//           label="Email - மின்னஞ்சல்"
//           multiline
//           maxRows={6}
//           variant="outlined"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//             setEmailError("");
//           }}
//           required
//           error={!!emailError}
//           helperText={emailError}
//         />
//         <br />
//         <div display="flex">
//           <TextField
//             // id="countryCode"
//             value={"+60"}
//             multiline
//             maxRows={6}
//             variant="outlined"
//             style={{ width: "17%" }}
//             disabled
//           />
//           <TextField
//             name="phoneNumber"
//             label="Phone Number - தொலைபேசி எண்"
//             multiline
//             maxRows={6}
//             variant="outlined"
//             style={{ width: "83%" }}
//             value={phoneNumber}
//             onChange={(e) => {
//               setPhoneNumber(e.target.value);
//               setNameError("");
//             }}
//             required
//             error={!!phoneNumberError}
//             helperText={phoneNumberError}
//           />
//         </div>
//         <br />
//         <TextField
//           name="password"
//           label="Password - கடவுச்சொல்"
//           //   multiline
//           maxRows={6}
//           variant="outlined"
//           type="password"
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//             setPasswordError("");
//           }}
//           required
//           error={!!passwordError}
//           helperText={passwordError}
//         />
//         <br />
//         <TextField
//           name="confirmPassword"
//           label="Confirm Password - கடவுச்சொல்லை உறுதிப்படுத்தவும்"
//           //   multiline
//           maxRows={6}
//           variant="outlined"
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => {
//             setConfirmPassword(e.target.value);
//             setConfirmPasswordError("");
//           }}
//           required
//           error={!!confirmPasswordError}
//           helperText={confirmPasswordError}
//         />
//         <br />
//         <Button
//           onClick={handleSignupClick}
//           style={{ width: "100%" }}
//           variant="contained"
//         >
//           Sign Up
//         </Button>
//         <Modal
//           open={openModal}
//           onClose={handleCloseModal}
//           aria-labelledby="modal-title"
//           aria-describedby="modal-description"
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: "50%",
//               bgcolor: "white",
//               borderRadius: 5,
//               boxShadow: 24,
//               p: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "start",
//             }}
//           >
//             <IconButton
//               aria-label="close"
//               onClick={handleCloseModal}
//               sx={{
//                 position: "absolute",
//                 top: 3,
//                 right: 3,
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography variant="h6" component="div" gutterBottom>
//               Sign-up successful!
//             </Typography>
//             <Typography sx={{ mt: 2 }} paragraph>
//               Please check your email for verification.
//             </Typography>
//           </Box>
//         </Modal>
//       </Box>
//     </div>
//   );
// };

// export default Signup;
