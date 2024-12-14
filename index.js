import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./src/db/db.js";
import cors from "cors"
import dirname from "./src/utils/dirname.js";
import path from "path";
import { createQrCode } from "./src/utils/qrCodeGenerator.js";
dotenv.config()
const app = express();



// Serve static files from the "public" folder
app.use(express.static(path.join(dirname, "public")));
app.use(express.json())
app.use(cors())

// Route to generate and send a QR code
app.get("/", async (req, res) => {
  const opts = {
    errorCorrectionLevel: "H",
    type: "image/png",
    quality: 0.1,
    margin: 1,
    color: {
      dark: "#010599FF",
      light: "#FFBF60FF",
    },
  };

  // Generate a unique file path for the QR code
  

  try {
    // Generate QR code and save it to the file
    await createQrCode(qrCodePath,"url")
    console.log(`QR code saved to ${qrCodePath}`);
    res.send(`<h1>QR Code Generated</h1><img src="/codes/${fileName}" alt="QR Code"/>`);
  } catch (err) {
    console.error("Failed to generate QR code:", err);
    res.status(500).send("Failed to generate QR code.");
  }
});

// Route to display a sample QR code (static example)
app.get("/read", (req, res) => {
  const qrCodeURL = "/codes/1734106628402.png"; // Point to a pre-existing image in "public/codes"
  res.send(`<h1>View QR Code</h1><img src="${qrCodeURL}" alt="QR Code"/>`);
});


import { MenuRouter } from "./src/routes/MenuRouter.js";
app.use("/api/menu",MenuRouter)

import { MenuItemRouter } from "./src/routes/MenuItemRouter.js";
app.use("/api/menu-item",MenuItemRouter)

import { OrderRouter } from "./src/routes/OrderRouter.js";
import { handleAdminLogin } from "./src/controllers/adminController.js";
app.use("/api",OrderRouter)

app.post("/admin/login",handleAdminLogin)

// Start the server

connectDB()
app.listen(8000, () => {
  console.log("Server is up and running at http://localhost:8000");
});
