import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'

import notesRoutes from './routes/notesRoutes.js'; // Correct relative path from `src`
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import authRoutes from './routes/authRoutes.js'; // Correct relative path from `src`  


dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Adjust this to your frontend URL
    })
  );
}

// Middleware to parse JSON bodies
app.use(express.json()); // to get the request body in JSON format inside our notesController which is the req.body
app.use(rateLimiter);


// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next(); // Call the next middleware function in the stack
// })

app.use('/api/auth', authRoutes)

app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}




connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
});

