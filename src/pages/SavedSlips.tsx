import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BettingSlip, Match } from "@/types/match";
import {
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BettingSlipModal } from "@/components/BettingSlipModal";

interface SavedSlip {
  id: number;
  slip: BettingSlip;
  createdAt: string;
}

const SavedSlips = () => {
  const [savedSlips, setSavedSlips] = useState<SavedSlip[]>([]);
  const [selectedSlip, setSelectedSlip] = useState<SavedSlip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch saved slips from backend
  const fetchSavedSlips = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/betting-slips");
      if (!response.ok) throw new Error("Failed to fetch saved slips");

      const result = await response.json();
      const formattedSlips = result.data.map((slip: any) => ({
        id: slip.id,
        slip: {
          matches: slip.matches,
          paripesaCode: slip.paripesaCode,
          afropariCode: slip.afropariCode,
          secretBetCode: slip.secretBetCode,
          totalOdds: Number(slip.totalOdds),
          date: slip.date,
          name: slip.name,
        },
        createdAt: slip.createdAt,
      }));

      setSavedSlips(formattedSlips);
    } catch (error) {
      console.error("Error fetching saved slips:", error);
      toast({
        title: "Error",
        description:
          "Failed to load saved betting slips. Please ensure the backend server is running.",
        variant: "destructive",
      });
    }
  };

  // Delete a saved slip
  const deleteSlip = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/betting-slips/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete betting slip");

      toast({
        title: "Success",
        description: "Betting slip deleted successfully",
      });

      fetchSavedSlips(); // Refresh the list
    } catch (error) {
      console.error("Error deleting betting slip:", error);
      toast({
        title: "Error",
        description:
          "Failed to delete betting slip. Please ensure the backend server is running.",
        variant: "destructive",
      });
    }
  };

  // Update match status
  const updateMatchStatus = async (
    slipId: number,
    matchId: string,
    status: "won" | "lost" | "cancelled"
  ) => {
    try {
      // Find the slip to update
      const slipToUpdate = savedSlips.find((slip) => slip.id === slipId);
      if (!slipToUpdate) return;

      // Update the match status
      const updatedMatches = slipToUpdate.slip.matches.map((match) =>
        match.id === matchId ? { ...match, status } : match
      );

      // Update the slip with new matches
      const updatedSlip = {
        ...slipToUpdate,
        slip: {
          ...slipToUpdate.slip,
          matches: updatedMatches,
        },
      };

      // Send update to backend
      const response = await fetch(
        `http://localhost:3001/api/betting-slips/${slipId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSlip.slip),
        }
      );

      if (!response.ok) throw new Error("Failed to update betting slip");

      // Update local state
      const updatedSlips = savedSlips.map((slip) =>
        slip.id === slipId ? updatedSlip : slip
      );
      setSavedSlips(updatedSlips);

      // If the modal is open and showing this slip, update the selected slip
      if (selectedSlip && selectedSlip.id === slipId) {
        setSelectedSlip(updatedSlip);
      }

      toast({
        title: "Success",
        description: "Match status updated successfully",
      });
    } catch (error) {
      console.error("Error updating match status:", error);
      toast({
        title: "Error",
        description:
          "Failed to update match status. Please ensure the backend server is running.",
        variant: "destructive",
      });
    }
  };

  // View a saved slip (navigate to edit page)
  const viewSlip = (slip: BettingSlip) => {
    // We'll pass the slip data through navigation state
    navigate("/", { state: { slip } });
  };

  // Get status icon
  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case "won":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "lost":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "cancelled":
        return <MoreHorizontal className="w-5 h-5 text-gray-500" />;
      default:
        return <span className="text-gray-400">-</span>;
    }
  };

  // Load saved slips when component mounts
  useEffect(() => {
    fetchSavedSlips();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-betting-header mb-2">
            Saved <span className="text-betting-orange">Betting Slips</span>
          </h1>
          <p className="text-gray-600">
            View and manage your saved betting slips
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="mr-2"
          >
            Create New Slip
          </Button>
          <Button onClick={() => navigate("/analytics")} variant="outline">
            Analytics
          </Button>
        </div>

        {savedSlips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No saved betting slips found
            </p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Create New Slip
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedSlips.map((savedSlip) => (
              <Card key={savedSlip.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">
                    Slip #{savedSlip.id}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(savedSlip.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Matches</p>
                    <p className="font-medium text-sm">
                      {savedSlip.slip.matches.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Odds</p>
                    <p className="font-medium text-betting-orange text-sm">
                      {savedSlip.slip.totalOdds.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedSlip(savedSlip);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-1 px-2 py-1 h-8 text-xs"
                  >
                    <Eye className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSlip(savedSlip.id);
                    }}
                    className="flex items-center gap-1 px-2 py-1 h-8 text-xs"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedSlip && (
          <BettingSlipModal
            slip={selectedSlip.slip}
            slipId={selectedSlip.id}
            open={isModalOpen}
            onOpenChange={(open) => {
              setIsModalOpen(open);
              if (!open) {
                setSelectedSlip(null);
              }
            }}
            onUpdateMatchStatus={updateMatchStatus}
          />
        )}
      </div>
    </div>
  );
};

export default SavedSlips;
