import express from "express";
import { BettingSlipController } from "../controllers/bettingSlipController.js";

const router = express.Router();

// Save a new betting slip
router.post("/", BettingSlipController.saveBettingSlip);

// Get all betting slips
router.get("/", BettingSlipController.getAllBettingSlips);

// Get analytics data
router.get("/analytics", BettingSlipController.getAnalytics);

// Get a specific betting slip by ID
router.get("/:id", BettingSlipController.getBettingSlipById);

// Update a betting slip
router.put("/:id", BettingSlipController.updateBettingSlip);

// Delete a betting slip
router.delete("/:id", BettingSlipController.deleteBettingSlip);

export default router;
