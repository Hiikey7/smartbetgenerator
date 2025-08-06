export interface Match {
  id: string;
  country: string;
  time: string;
  pick: string;
  homeTeam: string;
  awayTeam: string;
  websiteUrl: string;
  odds: number;
  status?: "won" | "lost" | "cancelled"; // Add status field with optional values
}

export interface BettingSlip {
  matches: Match[];
  paripesaCode: string;
  afropariCode: string;
  secretBetCode: string;
  totalOdds: number;
  date?: string;
  name?: string;
}
