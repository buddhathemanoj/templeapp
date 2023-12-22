
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import { Remove, Add, BookOnline, Favorite } from "@mui/icons-material";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { Button, Typography, IconButton } from "@mui/material";
import SwipeableEdgeDrawer from "../swipabledrawer"; // Adjust the import path based on your project structure
import "./Booking.css";
import data from "./data.json";
import { submitFormData } from "../firebaseutils";
import Navbar from "../Navbar/Navbar";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { name, email, noofpersons, address } = location.state || {};
  const [cardData, setCardData] = useState(data);
  const [selectedItems, setSelectedItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isFav, setFav] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price whenever selectedItems or cardData change
    const calculatedTotalPrice = selectedItems.reduce(
      (total, item) => total + (item.price * (item.count || 0)),
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [selectedItems, cardData]);


  const handleSelectItem = (item, itemId) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id
    );

    if (!existingItem) {
      setSelectedItems((prevSelected) => [
        ...prevSelected,
        { ...item, count: 1, totalPrice: item.price },
      ]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.map((selectedItem) =>
          selectedItem.id === item.id
            ? {
              ...selectedItem,
              count: selectedItem.count + 1,
              totaleachPrice: selectedItem.totalPrice + item.price,
            }
            : selectedItem
        )
      );
    }

    setCardData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, count: (item.count || 0) + 1 } : item
      )
    );
  };

  const handleRemoveItem = (item, itemId) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id
    );

    if (existingItem) {
      setSelectedItems((prevSelected) =>
        prevSelected.map((selectedItem) =>
          selectedItem.id === item.id
            ? {
              ...selectedItem,
              count: selectedItem.count - 1,
              totalPrice: selectedItem.totalPrice - item.price,
            }
            : selectedItem
        )
      );

      if (existingItem.count === 1) {
        setSelectedItems((prevSelected) =>
          prevSelected.filter((selectedItem) => selectedItem.id !== item.id)
        );
      }
    }

    setCardData((prevData) =>
      prevData.map((item) =>
        item.id === itemId && item.count && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const handledrawer = () => {
    setDrawerOpen(true);
  };

  const handleBooking = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="booking-contaniner">
        {cardData.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345, my: 2, flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={item.image}
                alt={`${item.title} image`}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    RM :{item.price}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "center", pl: 4, pb: 1 }}>
                  <IconButton
                    className={
                      selectedItems.some(
                        (selectedItem) => selectedItem.id === item.id
                      )
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleSelectItem(item, item.id)}
                  >
                    <Add />
                  </IconButton>
                  <p>{item.count || 0}</p>
                  <IconButton
                    className={
                      selectedItems.some(
                        (selectedItem) => selectedItem.id === item.id
                      )
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleRemoveItem(item, item.id)}
                  >
                    <Remove />
                  </IconButton>
                  <IconButton>
                    <Favorite />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Card>
        ))}

        <div>
          <Box>
            <Button
              size="large"
              variant="contained"
              endIcon={<BookOnline />}
              onClick={handleBooking}
              style={{ marginBottom: "59px" }}
            >
              Confirm Ticket
            </Button>
          </Box>
        </div>

        <SwipeableEdgeDrawer
          open={drawerOpen}
          onOpen={handledrawer}
          onClose={handleDrawerClose}
          name={name}
          email={email}
          noofpersons={noofpersons}
          address={address}
          cardData={cardData}
          selectedItems={selectedItems}
          totalPrice={totalPrice}
        />
      </div>
    </>
  );
};

export default Booking;
