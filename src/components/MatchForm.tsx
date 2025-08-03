import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Match, BettingSlip } from "@/types/match";

interface MatchFormProps {
  onBettingSlipChange: (slip: BettingSlip) => void;
}

export const MatchForm = ({ onBettingSlipChange }: MatchFormProps) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [paripesaCode, setParipesaCode] = useState("uvfgt5");
  const [afropariCode, setAfropariCode] = useState("uvfgt5");
  const [customDate, setCustomDate] = useState("");

  const calculateTotalOdds = (matchList: Match[]) => {
    return matchList.reduce((total, match) => total * match.odds, 1);
  };

  const updateBettingSlip = (
    newMatches: Match[],
    newParipesa?: string,
    newAfropari?: string,
    newDate?: string
  ) => {
    const slip: BettingSlip = {
      matches: newMatches,
      paripesaCode: newParipesa || paripesaCode,
      afropariCode: newAfropari || afropariCode,
      totalOdds: calculateTotalOdds(newMatches),
      date: newDate !== undefined ? newDate : customDate,
    };
    onBettingSlipChange(slip);
  };

  const addMatch = () => {
    if (matches.length < 10) {
      const newMatch: Match = {
        id: crypto.randomUUID(),
        country: "Bel",
        time: "19:00",
        pick: "Under 11.5 Corners",
        homeTeam: "Gent",
        awayTeam: "UR la louviere Centre",
        websiteUrl: "www.smartbets.co.ke",
        odds: 1.32,
      };
      const newMatches = [...matches, newMatch];
      setMatches(newMatches);
      updateBettingSlip(newMatches);
    }
  };

  const removeMatch = (id: string) => {
    const newMatches = matches.filter((match) => match.id !== id);
    setMatches(newMatches);
    updateBettingSlip(newMatches);
  };

  const updateMatch = (
    id: string,
    field: keyof Match,
    value: string | number
  ) => {
    const newMatches = matches.map((match) =>
      match.id === id ? { ...match, [field]: value } : match
    );
    setMatches(newMatches);
    updateBettingSlip(newMatches);
  };

  const handleCodesUpdate = (field: "paripesa" | "afropari", value: string) => {
    if (field === "paripesa") {
      setParipesaCode(value);
      updateBettingSlip(matches, value, afropariCode, customDate);
    } else {
      setAfropariCode(value);
      updateBettingSlip(matches, paripesaCode, value, customDate);
    }
  };

  const handleDateUpdate = (value: string) => {
    setCustomDate(value);
    updateBettingSlip(matches, paripesaCode, afropariCode, value);
  };

  return (
    <div className="space-y-4 sm:space-y-6 relative">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Betting Slip Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="paripesa" className="text-sm sm:text-base">
                Paripesa Code
              </Label>
              <Input
                id="paripesa"
                value={paripesaCode}
                onChange={(e) => handleCodesUpdate("paripesa", e.target.value)}
                placeholder="Enter Paripesa code"
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <Label htmlFor="afropari" className="text-sm sm:text-base">
                Afropari Code
              </Label>
              <Input
                id="afropari"
                value={afropariCode}
                onChange={(e) => handleCodesUpdate("afropari", e.target.value)}
                placeholder="Enter Afropari code"
                className="text-sm sm:text-base"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <Label htmlFor="customDate" className="text-sm sm:text-base">
                Date (optional)
              </Label>
              <Input
                id="customDate"
                type="date"
                value={customDate}
                onChange={(e) => handleDateUpdate(e.target.value)}
                placeholder="Leave empty for today's date"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h3 className="text-base sm:text-lg font-semibold">
            Matches ({matches.length}/10)
          </h3>
          <Button
            onClick={addMatch}
            disabled={matches.length >= 10}
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add Match
          </Button>
        </div>

        {matches.map((match, index) => (
          <Card key={match.id} className="rounded-2xl border-2">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <CardTitle className="text-base sm:text-lg">
                  Match {index + 1}
                </CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeMatch(match.id)}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm sm:text-base">Country</Label>
                  <Input
                    value={match.country}
                    onChange={(e) =>
                      updateMatch(match.id, "country", e.target.value)
                    }
                    placeholder="e.g., Bel"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label className="text-sm sm:text-base">Time</Label>
                  <Input
                    value={match.time}
                    onChange={(e) =>
                      updateMatch(match.id, "time", e.target.value)
                    }
                    placeholder="e.g., 19:00"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <Label className="text-sm sm:text-base">Odds</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={match.odds}
                    onChange={(e) =>
                      updateMatch(
                        match.id,
                        "odds",
                        parseFloat(e.target.value) || 1
                      )
                    }
                    placeholder="e.g., 1.32"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm sm:text-base">Pick</Label>
                <Input
                  value={match.pick}
                  onChange={(e) =>
                    updateMatch(match.id, "pick", e.target.value)
                  }
                  placeholder="e.g., Under 11.5 Corners"
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm sm:text-base">Home Team</Label>
                  <Input
                    value={match.homeTeam}
                    onChange={(e) =>
                      updateMatch(match.id, "homeTeam", e.target.value)
                    }
                    placeholder="e.g., Gent"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label className="text-sm sm:text-base">Away Team</Label>
                  <Input
                    value={match.awayTeam}
                    onChange={(e) =>
                      updateMatch(match.id, "awayTeam", e.target.value)
                    }
                    placeholder="e.g., UR la louviere Centre"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fixed Add Match Button for Mobile */}
      <Button
        onClick={addMatch}
        disabled={matches.length >= 10}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 flex items-center justify-center p-0 lg:hidden bg-betting-orange hover:bg-betting-orange/90 disabled:bg-gray-400"
        size="lg"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};
