// routes/leadRoutes.js
import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead
} from "../controllers/leadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All lead routes are protected
router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

export default router;
