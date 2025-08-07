import db from "../config/db.js";
import { BettingSlip } from "../models/BettingSlip.js";

export class BettingSlipController {
  // Save a new betting slip
  static async saveBettingSlip(req, res) {
    try {
      const bettingSlipData = req.body;
      const bettingSlip = new BettingSlip(bettingSlipData);

      const dbData = bettingSlip.toDatabaseFormat();

      const query = `
        INSERT INTO betting_slips
        (matches, paripesa_code, afropari_code, secret_bet_code, total_odds, date, name)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        dbData.matches,
        dbData.paripesa_code,
        dbData.afropari_code,
        dbData.secret_bet_code,
        dbData.total_odds,
        dbData.date,
        dbData.name,
      ];

      const [result] = await db.execute(query, values);

      res.status(201).json({
        success: true,
        message: "Betting slip saved successfully",
        id: result.insertId,
      });
    } catch (error) {
      console.error("Error saving betting slip:", error);
      res.status(500).json({
        success: false,
        message: "Failed to save betting slip",
        error: error.message,
      });
    }
  }

  // Get all betting slips
  static async getAllBettingSlips(req, res) {
    try {
      const query = "SELECT * FROM betting_slips ORDER BY created_at DESC";
      const [rows] = await db.execute(query);

      const bettingSlips = rows.map((row) => BettingSlip.fromDatabaseRow(row));

      res.status(200).json({
        success: true,
        data: bettingSlips,
      });
    } catch (error) {
      console.error("Error fetching betting slips:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch betting slips",
        error: error.message,
      });
    }
  }

  // Get a specific betting slip by ID
  static async getBettingSlipById(req, res) {
    try {
      const { id } = req.params;
      const query = "SELECT * FROM betting_slips WHERE id = ?";
      const [rows] = await db.execute(query, [id]);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Betting slip not found",
        });
      }

      const bettingSlip = BettingSlip.fromDatabaseRow(rows[0]);

      res.status(200).json({
        success: true,
        data: bettingSlip,
      });
    } catch (error) {
      console.error("Error fetching betting slip:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch betting slip",
        error: error.message,
      });
    }
  }

  // Update a betting slip
  static async updateBettingSlip(req, res) {
    try {
      const { id } = req.params;
      const bettingSlipData = req.body;
      const bettingSlip = new BettingSlip(bettingSlipData);

      const dbData = bettingSlip.toDatabaseFormat();

      const query = `
        UPDATE betting_slips
        SET matches = ?, paripesa_code = ?, afropari_code = ?,
            secret_bet_code = ?, total_odds = ?, date = ?, name = ?
        WHERE id = ?
      `;

      const values = [
        dbData.matches,
        dbData.paripesa_code,
        dbData.afropari_code,
        dbData.secret_bet_code,
        dbData.total_odds,
        dbData.date,
        dbData.name,
        id,
      ];

      const [result] = await db.execute(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Betting slip not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Betting slip updated successfully",
      });
    } catch (error) {
      console.error("Error updating betting slip:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update betting slip",
        error: error.message,
      });
    }
  }

  // Delete a betting slip
  static async deleteBettingSlip(req, res) {
    try {
      const { id } = req.params;
      const query = "DELETE FROM betting_slips WHERE id = ?";
      const [result] = await db.execute(query, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Betting slip not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Betting slip deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting betting slip:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete betting slip",
        error: error.message,
      });
    }
  }

  // Get analytics data for won, lost, and cancelled matches
  static async getAnalytics(req, res) {
    try {
      console.log("Fetching analytics data...");

      // Get all betting slips
      const query = "SELECT * FROM betting_slips ORDER BY created_at DESC";
      console.log("Executing query:", query);
      const [rows] = await db.execute(query);
      console.log("Query executed successfully, rows found:", rows.length);

      const bettingSlips = rows.map((row) => {
        console.log("Processing row:", row.id);
        return BettingSlip.fromDatabaseRow(row);
      });

      // Calculate date ranges
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Initialize data structures for analytics
      const sevenDaysData = {};
      const thirtyDaysData = {};

      // Initialize dates for 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split("T")[0];
        sevenDaysData[dateStr] = {
          date: dateStr,
          won: 0,
          lost: 0,
          cancelled: 0,
        };
      }

      // Initialize dates for 30 days
      for (let i = 0; i < 30; i++) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split("T")[0];
        thirtyDaysData[dateStr] = {
          date: dateStr,
          won: 0,
          lost: 0,
          cancelled: 0,
        };
      }

      // Process betting slips and matches
      console.log("Processing", bettingSlips.length, "betting slips");
      bettingSlips.forEach((slip, slipIndex) => {
        console.log(
          "Processing slip",
          slipIndex,
          "with",
          slip.matches.length,
          "matches"
        );
        slip.matches.forEach((match, matchIndex) => {
          console.log("Processing match", matchIndex, "status:", match.status);
          if (match.status) {
            const matchDate = slip.createdAt
              ? new Date(slip.createdAt).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0];
            console.log("Match date:", matchDate);

            // Update 7 days data
            if (sevenDaysData[matchDate]) {
              sevenDaysData[matchDate][match.status]++;
              console.log("Updated 7 days data for", matchDate, match.status);
            }

            // Update 30 days data
            if (thirtyDaysData[matchDate]) {
              thirtyDaysData[matchDate][match.status]++;
              console.log("Updated 30 days data for", matchDate, match.status);
            }
          }
        });
      });

      // Convert to arrays and sort by date
      const sevenDaysArray = Object.values(sevenDaysData).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      const thirtyDaysArray = Object.values(thirtyDaysData).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      console.log("Analytics data processed successfully");
      res.status(200).json({
        success: true,
        data: {
          sevenDays: sevenDaysArray,
          thirtyDays: thirtyDaysArray,
        },
      });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch analytics data",
        error: error.message,
      });
    }
  }
}
