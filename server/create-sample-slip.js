import db from "./config/db.js";
import { BettingSlip } from "./models/BettingSlip.js";

async function createSampleSlip() {
  try {
    console.log("Starting sample slip creation process...");

    // Create a sample betting slip with matches
    const sampleSlipData = {
      matches: [
        {
          id: "1",
          country: "ENG",
          time: "15:00",
          pick: "Over 2.5 Goals",
          homeTeam: "Manchester United",
          awayTeam: "Liverpool",
          websiteUrl: "www.smartbets.co.ke",
          odds: 1.85,
          status: "won",
        },
        {
          id: "2",
          country: "ESP",
          time: "20:00",
          pick: "Both Teams to Score",
          homeTeam: "Real Madrid",
          awayTeam: "Barcelona",
          websiteUrl: "www.smartbets.co.ke",
          odds: 2.1,
          status: "lost",
        },
        {
          id: "3",
          country: "GER",
          time: "17:30",
          pick: "Home Win",
          homeTeam: "Bayern Munich",
          awayTeam: "Borussia Dortmund",
          websiteUrl: "www.smartbets.co.ke",
          odds: 1.65,
          status: "cancelled",
        },
      ],
      paripesaCode: "uvfgt5",
      afropariCode: "uvfgt5",
      secretBetCode: "uvfgt5",
      totalOdds: 1.85 * 2.1 * 1.65,
      date: new Date().toISOString().split("T")[0],
      name: "Daily 2odds Rollover",
    };

    console.log(
      "Sample slip data prepared:",
      JSON.stringify(sampleSlipData, null, 2)
    );

    const bettingSlip = new BettingSlip(sampleSlipData);
    const dbData = bettingSlip.toDatabaseFormat();

    console.log(
      "Converted to database format:",
      JSON.stringify(dbData, null, 2)
    );

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

    console.log("Executing database insert query...");
    const [result] = await db.execute(query, values);

    console.log(
      "Sample betting slip created successfully with ID:",
      result.insertId
    );
    console.log("Slip details:", sampleSlipData);

    // Verify the slip was saved correctly
    console.log("Verifying slip was saved correctly...");
    const [rows] = await db.execute(
      "SELECT * FROM betting_slips WHERE id = ?",
      [result.insertId]
    );
    if (rows.length > 0) {
      const savedSlip = BettingSlip.fromDatabaseRow(rows[0]);
      console.log(
        "Saved slip from database:",
        JSON.stringify(savedSlip, null, 2)
      );
    } else {
      console.log("Warning: Could not verify slip was saved correctly");
    }

    console.log("Sample slip creation process completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating sample slip:", error);
    process.exit(1);
  }
}

console.log("Creating sample betting slip...");
createSampleSlip();
