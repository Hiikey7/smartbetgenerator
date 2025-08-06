// Test data for betting slip
const testBettingSlip = {
  matches: [
    {
      id: "1",
      country: "Bel",
      time: "19:00",
      pick: "Under 11.5 Corners",
      homeTeam: "Gent",
      awayTeam: "UR la louviere Centre",
      websiteUrl: "www.smartbets.co.ke",
      odds: 1.32,
    },
    {
      id: "2",
      country: "Eng",
      time: "20:00",
      pick: "Over 2.5 Goals",
      homeTeam: "Manchester United",
      awayTeam: "Liverpool",
      websiteUrl: "www.smartbets.co.ke",
      odds: 2.15,
    },
  ],
  paripesaCode: "uvfgt5",
  afropariCode: "uvfgt5",
  secretBetCode: "uvfgt5",
  totalOdds: 2.83,
  date: "2025-08-06",
};

console.log("Test betting slip data:");
console.log(JSON.stringify(testBettingSlip, null, 2));

export default testBettingSlip;
