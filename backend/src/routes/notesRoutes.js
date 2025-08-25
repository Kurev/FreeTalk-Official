import express from "express";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  updateNotes,
  getNoteById,
  likeNotes,
} from "../controllers/notesController.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.patch("/:id/like", likeNotes);

// Only admins can delete
router.delete("/:id", adminAuth, deleteNotes);

export default router;
