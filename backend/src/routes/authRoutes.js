// backend/routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables from .env file

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // ✅ Debug log (remove in production)
  console.log("Username entered:", username);
  console.log("Password entered:", password);
  console.log("Expected username:", process.env.ADMIN_USERNAME);
  console.log("Expected password:", process.env.ADMIN_PASSWORD);

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

export default router;
