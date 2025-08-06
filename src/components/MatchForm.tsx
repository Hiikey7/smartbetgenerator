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
  initialSlip?: BettingSlip | null;
}

export const MatchForm = ({
  onBettingSlipChange,
  initialSlip,
}: MatchFormProps) => {
  const [matches, setMatches] = useState<Match[]>(initialSlip?.matches || []);
  const [paripesaCode, setParipesaCode] = useState(
    initialSlip?.paripesaCode || "uvfgt5"
  );
  const [afropariCode, setAfropariCode] = useState(
    initialSlip?.afropariCode || "uvfgt5"
  );
  const [secretBetCode, setSecretBetCode] = useState(
    initialSlip?.secretBetCode || "uvfgt5"
  );
  const [customDate, setCustomDate] = useState(initialSlip?.date || "");
  const [name, setName] = useState(initialSlip?.name || "");
  const [useCustomName, setUseCustomName] = useState(false);

  const predefinedSlipNames = [
    "10 odds Combo",
    "Golden ticket",
    "2 ODDS ROLLOVER",
    "1000 CRAZY ODDS",
    "100 MULTIBET ODDS",
  ];

  const calculateTotalOdds = (matchList: Match[]) => {
    return matchList.reduce((total, match) => total * match.odds, 1);
  };

  const updateBettingSlip = (
    newMatches: Match[],
    newParipesa?: string,
    newAfropari?: string,
    newSecretBet?: string,
    newDate?: string,
    newName?: string
  ) => {
    const slip: BettingSlip = {
      matches: newMatches,
      paripesaCode: newParipesa || paripesaCode,
      afropariCode: newAfropari || afropariCode,
      secretBetCode: newSecretBet || secretBetCode,
      totalOdds: calculateTotalOdds(newMatches),
      date: newDate !== undefined ? newDate : customDate,
      name: newName !== undefined ? newName : name,
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
      updateBettingSlip(
        newMatches,
        paripesaCode,
        afropariCode,
        secretBetCode,
        customDate,
        name
      );
    }
  };

  const removeMatch = (id: string) => {
    const newMatches = matches.filter((match) => match.id !== id);
    setMatches(newMatches);
    updateBettingSlip(
      newMatches,
      paripesaCode,
      afropariCode,
      secretBetCode,
      customDate,
      name
    );
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
    updateBettingSlip(
      newMatches,
      paripesaCode,
      afropariCode,
      secretBetCode,
      customDate,
      name
    );
  };

  const handleCodesUpdate = (
    field: "paripesa" | "afropari" | "secretbet",
    value: string
  ) => {
    if (field === "paripesa") {
      setParipesaCode(value);
      updateBettingSlip(
        matches,
        value,
        afropariCode,
        secretBetCode,
        customDate,
        name
      );
    } else if (field === "afropari") {
      setAfropariCode(value);
      updateBettingSlip(
        matches,
        paripesaCode,
        value,
        secretBetCode,
        customDate,
        name
      );
    } else {
      setSecretBetCode(value);
      updateBettingSlip(
        matches,
        paripesaCode,
        afropariCode,
        value,
        customDate,
        name
      );
    }
  };

  const handleDateUpdate = (value: string) => {
    setCustomDate(value);
    updateBettingSlip(
      matches,
      paripesaCode,
      afropariCode,
      secretBetCode,
      value,
      name
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4 relative">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">
            Betting Slip Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            <div>
              <Label htmlFor="paripesa" className="text-xs sm:text-sm">
                Paripesa Code
              </Label>
              <Input
                id="paripesa"
                value={paripesaCode}
                onChange={(e) => handleCodesUpdate("paripesa", e.target.value)}
                placeholder="Paripesa code"
                className="text-xs sm:text-sm h-8"
              />
            </div>
            <div>
              <Label htmlFor="afropari" className="text-xs sm:text-sm">
                Afropari Code
              </Label>
              <Input
                id="afropari"
                value={afropariCode}
                onChange={(e) => handleCodesUpdate("afropari", e.target.value)}
                placeholder="Afropari code"
                className="text-xs sm:text-sm h-8"
              />
            </div>
            <div>
              <Label htmlFor="secretbet" className="text-xs sm:text-sm">
                SecretBet Code
              </Label>
              <Input
                id="secretbet"
                value={secretBetCode}
                onChange={(e) => handleCodesUpdate("secretbet", e.target.value)}
                placeholder="SecretBet code"
                className="text-xs sm:text-sm h-8"
              />
            </div>
            <div>
              <Label htmlFor="customDate" className="text-xs sm:text-sm">
                Date
              </Label>
              <Input
                id="customDate"
                type="date"
                value={customDate}
                onChange={(e) => handleDateUpdate(e.target.value)}
                className="text-xs sm:text-sm h-8"
              />
            </div>
            <div>
              <Label htmlFor="slipName" className="text-xs sm:text-sm">
                Slip Name
              </Label>
              {useCustomName ? (
                <Input
                  id="slipName"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    updateBettingSlip(
                      matches,
                      paripesaCode,
                      afropariCode,
                      secretBetCode,
                      customDate,
                      e.target.value
                    );
                  }}
                  placeholder="Enter custom name"
                  className="text-xs sm:text-sm h-8"
                />
              ) : (
                <Select
                  value={name}
                  onValueChange={(value) => {
                    setName(value);
                    updateBettingSlip(
                      matches,
                      paripesaCode,
                      afropariCode,
                      secretBetCode,
                      customDate,
                      value
                    );
                  }}
                >
                  <SelectTrigger className="text-xs sm:text-sm h-8">
                    <SelectValue placeholder="Select a predefined name" />
                  </SelectTrigger>
                  <SelectContent>
                    {predefinedSlipNames.map((predefinedName) => (
                      <SelectItem key={predefinedName} value={predefinedName}>
                        {predefinedName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button
                variant="link"
                className="text-xs p-0 h-auto mt-1"
                onClick={() => setUseCustomName(!useCustomName)}
              >
                {useCustomName ? "Use predefined names" : "Use custom name"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h3 className="text-sm sm:text-base font-medium">
            Matches ({matches.length}/10)
          </h3>
          <Button
            onClick={addMatch}
            disabled={matches.length >= 10}
            className="flex items-center justify-center gap-1 w-full sm:w-auto h-8 text-xs"
          >
            <Plus className="w-3 h-3" />
            Add Match
          </Button>
        </div>

        {matches.map((match, index) => (
          <Card key={match.id} className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <CardTitle className="text-sm sm:text-base">
                  Match {index + 1}
                </CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeMatch(match.id)}
                  className="flex items-center justify-center gap-1 w-full sm:w-auto h-7 text-xs"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 py-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs sm:text-sm">Country</Label>
                  <Input
                    value={match.country}
                    onChange={(e) =>
                      updateMatch(match.id, "country", e.target.value)
                    }
                    placeholder="e.g., Bel"
                    className="text-xs sm:text-sm h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm">Time</Label>
                  <Input
                    value={match.time}
                    onChange={(e) =>
                      updateMatch(match.id, "time", e.target.value)
                    }
                    placeholder="e.g., 19:00"
                    className="text-xs sm:text-sm h-8"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <Label className="text-xs sm:text-sm">Odds</Label>
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
                    className="text-xs sm:text-sm h-8"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs sm:text-sm">Pick</Label>
                <Input
                  value={match.pick}
                  onChange={(e) =>
                    updateMatch(match.id, "pick", e.target.value)
                  }
                  placeholder="e.g., Under 11.5 Corners"
                  className="text-xs sm:text-sm h-8"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs sm:text-sm">Home Team</Label>
                  <Input
                    value={match.homeTeam}
                    onChange={(e) =>
                      updateMatch(match.id, "homeTeam", e.target.value)
                    }
                    placeholder="e.g., Gent"
                    className="text-xs sm:text-sm h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm">Away Team</Label>
                  <Input
                    value={match.awayTeam}
                    onChange={(e) =>
                      updateMatch(match.id, "awayTeam", e.target.value)
                    }
                    placeholder="e.g., UR la louviere Centre"
                    className="text-xs sm:text-sm h-8"
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
