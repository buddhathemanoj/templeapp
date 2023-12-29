
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { connect } from "react-redux";
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
import { db } from "../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

const Booking = ({ user, state }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("user", user.user)


  const [cardData, setCardData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isFav, setFav] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noofpersons, setNoofpersons] = useState("");
  useEffect(() => {
    if (user.user) {
      setName(user.user.name)
      setEmail(user.user.email)
      setNoofpersons(user.user.phoneNumber)
    }
  }, [user.user]);
  useEffect(() => {
    const calculatedTotalPrice = selectedItems.reduce(
      (total, item) => total + (item.price * (item.count || 0)),
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [selectedItems, cardData]);

  useEffect(() => {
    const fetchData = async () => {
      const servicesCollection = collection(db, "services");
      const servicesSnapshot = await getDocs(servicesCollection);
      const servicesData = servicesSnapshot.docs.map((doc, index) => {
        const data = doc.data();
        return { ...data, id: index + 1 }; // Adding id property starting from 1
      });
      setCardData(servicesData);
      console.log("servicesData", servicesData);
    };

    fetchData();
  }, [db]);

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
      <br />

      <br />
      <div className="booking-contaniner">
        <br />
        <br />

        {cardData?.map((item) => (
          <div style={{ padding: '0px 20px', alignItems: 'center', display: 'flex', justifyContent: 'center', margin: '0' }}>
            <Card key={item.id} sx={{ width: 345, my: 2, flexDirection: "row" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {/* Image on the left */}
                <CardMedia
                  component="img"
                  sx={{ width: 100, flexShrink: 0 }} // Set flexShrink to 0 to prevent the image from shrinking
                  image={item.image}
                  alt={`${item.title} image`}
                />

                <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, paddingLeft: 0 }}>
                  <CardContent sx={{ flex: "1 0 auto", textAlign: 'left', padding: '2px  10px 0px  10px', marginBottom: '10px' }}>
                    <Typography sx={{ fontSize: '18px' }} component="div" variant="h6">
                      {item.title}<br />
                      <b>  {item.titleTamil}</b>
                    </Typography>
                    <br />

                  </CardContent>

                  <Box sx={{ display: "flex", flexDirection: "row", gap: '10px', justifyContent: 'space-between', marginBottom: '5px', alignItems: "center" }}>


                    <div style={{ margin: '5px', paddingLeft: '3px', paddingTop: '4px' }}>
                      <Typography variant="h6" color="text.secondary" component='div'>
                        RM : {item.price}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', paddingRight: '3px' }}>
                      <IconButton
                        style={{ border: '1px solid #ccc', padding: '10px', width: "40px", height: "40px" }}
                        className={selectedItems.some((selectedItem) => selectedItem.id === item.id) ? "selected" : ""}
                        onClick={() => handleSelectItem(item, item.id)}
                      >
                        <Add style={{ color: 'green' }} />
                      </IconButton>
                      <p style={{ margin: "5px", fontSize: "19px" }}>{item.count || 0}</p>
                      <IconButton
                        style={{ border: '1px solid #ccc', padding: '10px', width: "40px", height: "40px" }}
                        className={selectedItems.some((selectedItem) => selectedItem.id === item.id) ? "selected" : ""}
                        onClick={() => handleRemoveItem(item, item.id)}
                      >
                        <Remove style={{ color: 'red' }} />
                      </IconButton>
                    </div>

                  </Box>
                </Box>
              </Box>
            </Card>


          </div>

        ))}
        <br />
        <br />
        <div className="padningnone" style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1000 }}>
          <Box sx={{ width: '100%' }}>
            <Button
              size="large"
              variant="contained"
              endIcon={<BookOnline />}
              onClick={handleBooking}
              style={{ borderRadius: '0px', width: '100%', backgroundColor: '#E9B824' }}
            >
              Confirm Ticket
            </Button>
          </Box>
        </div>

        <SwipeableEdgeDrawer
          open={drawerOpen}
          onOpen={handledrawer}
          onClose={handleDrawerClose}
        
          cardData={cardData}
          selectedItems={selectedItems}
          totalPrice={totalPrice}
          user={user}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  ...state
});

export default connect(mapStateToProps)(Booking);