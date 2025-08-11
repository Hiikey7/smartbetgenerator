<?php
class BettingSlip {
    public $id;
    public $matches;
    public $paripesa_code;
    public $afropari_code;
    public $secret_bet_code;
    public $total_odds;
    public $date;
    public $name;
    public $created_at;
    public $updated_at;

    public function __construct($data = []) {
        $this->id = isset($data['id']) ? $data['id'] : null;
        $this->matches = isset($data['matches']) ? $data['matches'] : [];
        $this->paripesa_code = isset($data['paripesaCode']) ? $data['paripesaCode'] : (isset($data['paripesa_code']) ? $data['paripesa_code'] : '');
        $this->afropari_code = isset($data['afropariCode']) ? $data['afropariCode'] : (isset($data['afropari_code']) ? $data['afropari_code'] : '');
        $this->secret_bet_code = isset($data['secretBetCode']) ? $data['secretBetCode'] : (isset($data['secret_bet_code']) ? $data['secret_bet_code'] : '');
        $this->total_odds = isset($data['totalOdds']) ? $data['totalOdds'] : (isset($data['total_odds']) ? $data['total_odds'] : 1);
        $this->date = isset($data['date']) ? $data['date'] : null;
        $this->name = isset($data['name']) ? $data['name'] : null;
        $this->created_at = isset($data['created_at']) ? $data['created_at'] : date('Y-m-d H:i:s');
        $this->updated_at = isset($data['updated_at']) ? $data['updated_at'] : date('Y-m-d H:i:s');
    }

    // Convert to database format
    public function toDatabaseFormat() {
        return [
            'id' => $this->id,
            'matches' => json_encode($this->matches),
            'paripesa_code' => $this->paripesa_code,
            'afropari_code' => $this->afropari_code,
            'secret_bet_code' => $this->secret_bet_code,
            'total_odds' => $this->total_odds,
            'date' => $this->date,
            'name' => $this->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }

    // Create from database row
    public static function fromDatabaseRow($row) {
        $data = [
            'id' => $row['id'],
            'matches' => json_decode($row['matches'], true),
            'paripesaCode' => $row['paripesa_code'],
            'afropariCode' => $row['afropari_code'],
            'secretBetCode' => $row['secret_bet_code'],
            'totalOdds' => $row['total_odds'],
            'date' => $row['date'],
            'name' => $row['name'],
            'createdAt' => $row['created_at'],
            'updatedAt' => $row['updated_at']
        ];
        return new BettingSlip($data);
    }
}
?>