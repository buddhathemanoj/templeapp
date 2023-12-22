import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from 'react-toastify';

import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { submitFormData } from "./firebaseutils";
import { useNavigate } from "react-router-dom";
import { useQRCode } from "next-qrcode";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const SwipeableEdgeDrawer = ({
  open,
  onClose,
  onOpen,
  name,
  email,
  noofpersons,
  selectedItems,
  totalPrice,
  cardData
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const { Canvas } = useQRCode();
  const [qrCodeData, setQrCodeData] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  console.log("total price", totalPrice)
  console.log("selecttedoteh", selectedItems)
  const handleConfirm = async () => {
    onOpen();

    if (checked && name.trim() !== "" && email.trim() !== "" && noofpersons.trim() !== "") {
      try {
        const formData = {
          name,
          email,
          noofpersons,
          selectedItems,
          totalPrice
        };

        const result = await submitFormData(formData);

        if (result) {
          setConfirmed(true);
          console.log("form submitted successfully", result);
          setQrCodeData(result);
          navigate("/success", { state: { result, formData, totalPrice } });
        }

      } catch (error) {
        console.log("something went wrong", error);
      }
    } else {
      toast.error("Please fill the Input Fields correctly and agree to the terms and conditions");
    }
  };

  const count = cardData.map((item) => item.count)
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const getCountById = (itemId) => {
    const selectedItem = cardData.find((item) => item.id === itemId);
    return selectedItem ? selectedItem.count || 0 : 0;
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => { }}
      // swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <StyledBox
        sx={{
          position: "absolute",
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: "visible",
          right: 0,
          left: 0,
        }}
      >
        <Puller />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </StyledBox>
      <StyledBox
        sx={{
          px: 2,
          pb: 2,
          height: "100%",
          overflow: "auto",
        }}
      >
        <Card sx={{ mt: 2, mb: 2 }}>

          <CardContent>

            <Typography style={{ fontSize: '16px', textDecoration: 'underline', textAlign: 'center' }} variant="h6"><b>Purchase Info</b> </Typography>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" component="div">
                <strong>Name - பெயர்:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                {name}
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" component="div">
                <strong>Email - மின்னஞ்சல்:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                {email}
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" component="div">
                <strong>Phone Number - தொலைபேசி எண்:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                {noofpersons}
              </Typography>
            </div>

          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {selectedItems.map((item) => (
              <div key={item.id}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" component="div">
                    <strong>Service - சேவை:</strong>
                  </Typography>
                  <Typography variant="body1" component="div">
                    {item.title}<br/>
                    {item.titlettamil}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" component="div">
                    <strong>Price - விலை:</strong>
                  </Typography>
                  <Typography variant="body1" component="div">
                    RM {item.price}
                  </Typography>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" component="div">
                    <strong>Qty - அளவு:</strong>
                  </Typography>
                  <Typography variant="body1" component="div">
                    {item.count}
                  </Typography>
                </div>

                <hr />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" component="div">
                <strong>Total Price - மொத்த விலை:</strong>
              </Typography>
              <Typography variant="body1" component="div">
                RM {totalPrice}
              </Typography>
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  style={{ float: 'left', paddingLeft: '20px' }}
                  aria-label="Terms and conditions"
                  checked={checked}
                  onChange={handleChange}
                />
              }
              label="I agree to the terms and conditions"
            />
            <Button
              size="large"
              sx={{ width: "100%" }}
              variant="contained"
              onClick={handleConfirm}
            >
              Confirm Ticket - டிக்கெட்டை உறுதிப்படுத்தவும்
            </Button>
          </CardContent>
        </Card>
      </StyledBox>
    </SwipeableDrawer>
  );
};

export default SwipeableEdgeDrawer;
