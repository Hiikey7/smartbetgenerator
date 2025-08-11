<?php
require_once 'config/database.php';
require_once 'models/BettingSlip.php';

class BettingSlipController {
    private $pdo;

    public function __construct($database) {
        $this->pdo = $database;
    }

    // Save a new betting slip
    public function saveBettingSlip($data) {
        try {
            $bettingSlip = new BettingSlip($data);
            $dbData = $bettingSlip->toDatabaseFormat();

            $query = "INSERT INTO betting_slips 
                      (matches, paripesa_code, afropari_code, secret_bet_code, total_odds, date, name) 
                      VALUES (?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $this->pdo->prepare($query);
            $result = $stmt->execute([
                $dbData['matches'],
                $dbData['paripesa_code'],
                $dbData['afropari_code'],
                $dbData['secret_bet_code'],
                $dbData['total_odds'],
                $dbData['date'],
                $dbData['name']
            ]);

            if ($result) {
                return [
                    'success' => true,
                    'message' => 'Betting slip saved successfully',
                    'id' => $this->pdo->lastInsertId()
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Failed to save betting slip'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to save betting slip',
                'error' => $e->getMessage()
            ];
        }
    }

    // Get all betting slips
    public function getAllBettingSlips() {
        try {
            $query = "SELECT * FROM betting_slips ORDER BY created_at DESC";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $bettingSlips = [];
            foreach ($rows as $row) {
                $bettingSlips[] = BettingSlip::fromDatabaseRow($row);
            }

            return [
                'success' => true,
                'data' => $bettingSlips
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to fetch betting slips',
                'error' => $e->getMessage()
            ];
        }
    }

    // Get a specific betting slip by ID
    public function getBettingSlipById($id) {
        try {
            $query = "SELECT * FROM betting_slips WHERE id = ?";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                return [
                    'success' => false,
                    'message' => 'Betting slip not found'
                ];
            }

            $bettingSlip = BettingSlip::fromDatabaseRow($row);
            return [
                'success' => true,
                'data' => $bettingSlip
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to fetch betting slip',
                'error' => $e->getMessage()
            ];
        }
    }

    // Update a betting slip
    public function updateBettingSlip($id, $data) {
        try {
            $bettingSlip = new BettingSlip($data);
            $dbData = $bettingSlip->toDatabaseFormat();

            $query = "UPDATE betting_slips 
                      SET matches = ?, paripesa_code = ?, afropari_code = ?, 
                          secret_bet_code = ?, total_odds = ?, date = ?, name = ? 
                      WHERE id = ?";
            
            $stmt = $this->pdo->prepare($query);
            $result = $stmt->execute([
                $dbData['matches'],
                $dbData['paripesa_code'],
                $dbData['afropari_code'],
                $dbData['secret_bet_code'],
                $dbData['total_odds'],
                $dbData['date'],
                $dbData['name'],
                $id
            ]);

            if ($stmt->rowCount() === 0) {
                return [
                    'success' => false,
                    'message' => 'Betting slip not found'
                ];
            }

            return [
                'success' => true,
                'message' => 'Betting slip updated successfully'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to update betting slip',
                'error' => $e->getMessage()
            ];
        }
    }

    // Delete a betting slip
    public function deleteBettingSlip($id) {
        try {
            $query = "DELETE FROM betting_slips WHERE id = ?";
            $stmt = $this->pdo->prepare($query);
            $result = $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                return [
                    'success' => false,
                    'message' => 'Betting slip not found'
                ];
            }

            return [
                'success' => true,
                'message' => 'Betting slip deleted successfully'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to delete betting slip',
                'error' => $e->getMessage()
            ];
        }
    }

    // Get analytics data for won, lost, and cancelled matches
    public function getAnalytics() {
        try {
            // Get all betting slips
            $query = "SELECT * FROM betting_slips ORDER BY created_at DESC";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $bettingSlips = [];
            foreach ($rows as $row) {
                $bettingSlips[] = BettingSlip::fromDatabaseRow($row);
            }

            // Calculate date ranges
            $now = new DateTime();
            $sevenDaysAgo = clone $now;
            $sevenDaysAgo->modify('-7 days');
            $thirtyDaysAgo = clone $now;
            $thirtyDaysAgo->modify('-30 days');

            // Initialize data structures for analytics
            $sevenDaysData = [];
            $thirtyDaysData = [];

            // Initialize dates for 7 days
            for ($i = 0; $i < 7; $i++) {
                $date = clone $now;
                $date->modify("-{$i} days");
                $dateStr = $date->format('Y-m-d');
                $sevenDaysData[$dateStr] = [
                    'date' => $dateStr,
                    'won' => 0,
                    'lost' => 0,
                    'cancelled' => 0
                ];
            }

            // Initialize dates for 30 days
            for ($i = 0; $i < 30; $i++) {
                $date = clone $now;
                $date->modify("-{$i} days");
                $dateStr = $date->format('Y-m-d');
                $thirtyDaysData[$dateStr] = [
                    'date' => $dateStr,
                    'won' => 0,
                    'lost' => 0,
                    'cancelled' => 0
                ];
            }

            // Process betting slips and matches
            foreach ($bettingSlips as $slip) {
                foreach ($slip->matches as $match) {
                    if (isset($match['status']) && $match['status']) {
                        $matchDate = $slip->created_at ? 
                            (new DateTime($slip->created_at))->format('Y-m-d') : 
                            $now->format('Y-m-d');

                        // Update 7 days data
                        if (isset($sevenDaysData[$matchDate])) {
                            $sevenDaysData[$matchDate][$match['status']]++;
                        }

                        // Update 30 days data
                        if (isset($thirtyDaysData[$matchDate])) {
                            $thirtyDaysData[$matchDate][$match['status']]++;
                        }
                    }
                }
            }

            // Convert to arrays and sort by date
            $sevenDaysArray = array_values($sevenDaysData);
            usort($sevenDaysArray, function($a, $b) {
                return strcmp($a['date'], $b['date']);
            });

            $thirtyDaysArray = array_values($thirtyDaysData);
            usort($thirtyDaysArray, function($a, $b) {
                return strcmp($a['date'], $b['date']);
            });

            return [
                'success' => true,
                'data' => [
                    'sevenDays' => $sevenDaysArray,
                    'thirtyDays' => $thirtyDaysArray
                ]
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to fetch analytics data',
                'error' => $e->getMessage()
            ];
        }
    }
}
?>