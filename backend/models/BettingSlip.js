export class BettingSlip {
  constructor(data) {
    this.id = data.id || null;
    this.matches = data.matches || [];
    this.paripesaCode = data.paripesaCode || "";
    this.afropariCode = data.afropariCode || "";
    this.secretBetCode = data.secretBetCode || "";
    this.totalOdds = data.totalOdds || 1;
    this.date = data.date || null;
    this.name = data.name || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Convert to database format
  toDatabaseFormat() {
    return {
      id: this.id,
      matches: JSON.stringify(this.matches),
      paripesa_code: this.paripesaCode,
      afropari_code: this.afropariCode,
      secret_bet_code: this.secretBetCode,
      total_odds: this.totalOdds,
      date: this.date,
      name: this.name,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  // Create from database row
  static fromDatabaseRow(row) {
    return new BettingSlip({
      id: row.id,
      matches: JSON.parse(row.matches),
      paripesaCode: row.paripesa_code,
      afropariCode: row.afropari_code,
      secretBetCode: row.secret_bet_code,
      totalOdds: row.total_odds,
      date: row.date,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}
