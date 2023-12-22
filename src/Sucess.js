import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode"; // Import the QRCode library
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Navbar from "./Navbar/Navbar";

const Success = () => {
  const location = useLocation();
  const [qrCodeUrl, setQRCodeUrl] = useState(null);
  const canvasRef = useRef(null);
  const downloadLinkRef = useRef(null);

  const { result, formData } = location.state || {};
  console.log(formData)
  const { name, email, noofpersons, selectedItems } = formData
  useEffect(() => {
    generateQRCode();
  }, [result]);

  const generateQRCode = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }

      const generatedQRCode = await QRCode.toDataURL(result, {
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#000000FF",
          light: "#FFFFFFFF",
        },
      });

      setQRCodeUrl(generatedQRCode); // Set the generated QR code URL
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadQRCode = () => {
    const dataUrl = qrCodeUrl;
    if (!dataUrl) {
      console.error("QR code image URL not found");
      return;
    }
    downloadLinkRef.current.href = dataUrl;
    downloadLinkRef.current.download = "qrcode.png";
    downloadLinkRef.current.click();
  };

  return (
<>
<Navbar/>
<Box sx={{ padding: '20px' }}>
      <a ref={downloadLinkRef} style={{ display: "none" }} />

      {/* Button to trigger download */}
      <Button onClick={downloadQRCode}>Download QR Code</Button>
      <Card sx={{ mt: 2, mb: 2, padding: '5px' }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Booking Information
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" component="div">
              <strong>Name:</strong>
            </Typography>
            <Typography variant="body1" component="div">
              {name}
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" component="div">
              <strong>Email:</strong>
            </Typography>
            <Typography variant="body1" component="div">
              {email}
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" component="div">
              <strong>No. of Persons:</strong>
            </Typography>
            <Typography variant="body1" component="div">
              {noofpersons}
            </Typography>
          </div>

        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {qrCodeUrl && (
            <div>
              <img
                src={qrCodeUrl}
                alt="QR Code"
                style={{ width: "200px", height: "200px", marginBottom: "10px" }}
              />
            </div>
          )}
          <h5> Scan this QR to enter</h5>
        </CardContent>

        {/* Hidden anchor tag */}

      </Card>
    </Box>
</>
  );
};

export default Success;
