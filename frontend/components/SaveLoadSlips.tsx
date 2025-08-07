import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Save } from "lucide-react";
import { BettingSlip } from "@/types/match";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/config/api";

interface SaveSlipsProps {
  currentBettingSlip: BettingSlip;
  onSlipSaved: () => void;
}

export const SaveSlips = ({
  currentBettingSlip,
  onSlipSaved,
}: SaveSlipsProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Save slip without opening dialog
  const quickSaveSlip = async () => {
    // Prevent multiple saves
    if (isSaving) return;

    setIsSaving(true);

    const slipToSave = {
      ...currentBettingSlip,
      name:
        currentBettingSlip.name ||
        `Betting Slip ${new Date().toLocaleDateString()}`,
    };

    try {
      const response = await fetch(API_ENDPOINTS.BETTING_SLIPS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slipToSave),
      });

      if (!response.ok) throw new Error("Failed to save betting slip");

      const result = await response.json();

      toast({
        title: "Success",
        description: "Betting slip saved successfully",
      });

      // Notify parent component that slip was saved
      onSlipSaved();
    } catch (error) {
      console.error("Error saving betting slip:", error);
      toast({
        title: "Error",
        description:
          "Failed to save betting slip. Please ensure the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      onClick={quickSaveSlip}
      className="flex items-center gap-2"
      disabled={isSaving || currentBettingSlip.matches.length === 0}
    >
      <Save className="w-4 h-4" />
      {isSaving ? "Saving..." : "Save Slip"}
    </Button>
  );
};
