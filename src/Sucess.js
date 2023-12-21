import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode"; // Import the QRCode library

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button, CardContent } from "@mui/material";

const Success = () => {
  const location = useLocation();
  const [qrCodeUrl, setQRCodeUrl] = useState(null);
  const canvasRef = useRef(null);
  const downloadLinkRef = useRef(null);

  const { result } = location.state || {};

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
    <Box>
      <Card>
        <CardContent>
          <h3>Your QR Code</h3>
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
        </CardContent>

        {/* Hidden anchor tag */}
        <a ref={downloadLinkRef} style={{ display: "none" }} />

        {/* Button to trigger download */}
        <Button onClick={downloadQRCode}>Download QR Code</Button>
      </Card>
    </Box>
  );
};

export default Success;
