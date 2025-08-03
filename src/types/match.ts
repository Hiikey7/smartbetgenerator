export interface Match {
  id: string;
  country: string;
  time: string;
  pick: string;
  homeTeam: string;
  awayTeam: string;
  websiteUrl: string;
  odds: number;
}

export interface BettingSlip {
  matches: Match[];
  paripesaCode: string;
  afropariCode: string;
  totalOdds: number;
  date?: string;
}
