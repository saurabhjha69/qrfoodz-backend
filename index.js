import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/db/db.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();

// Get the current directory dynamically
const filePath = fileURLToPath(import.meta.url);
const dirname = path.resolve(path.dirname(filePath)); // Resolve to root folder

// Serve static files from the "public" folder
app.use(express.static(path.join(dirname, "public")));
console.log("Serving static files from:", path.join(dirname, "public"));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi From Server!");
});

import { MenuRouter } from "./src/routes/MenuRouter.js";
app.use("/api/menu", MenuRouter);

import { MenuItemRouter } from "./src/routes/MenuItemRouter.js";
app.use("/api/menu-item", MenuItemRouter);

import { OrderRouter } from "./src/routes/OrderRouter.js";
import { handleAdminLogin } from "./src/controllers/adminController.js";
app.use("/api", OrderRouter);

app.post("/admin/login", handleAdminLogin);

// Start the server
connectDB();
app.listen(8000, () => {
  console.log("Server is up and running at http://localhost:8000");
});

export default app;
