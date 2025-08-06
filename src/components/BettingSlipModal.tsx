import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle, MoreHorizontal, Download } from "lucide-react";
import { BettingSlip, Match } from "@/types/match";
import { BettingSlipPreview } from "./BettingSlipPreview";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

interface BettingSlipModalProps {
  slip: BettingSlip;
  slipId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateMatchStatus: (
    slipId: number,
    matchId: string,
    status: "won" | "lost" | "cancelled"
  ) => void;
}

export const BettingSlipModal = ({
  slip: initialSlip,
  slipId,
  open,
  onOpenChange,
  onUpdateMatchStatus,
}: BettingSlipModalProps) => {
  const { toast } = useToast();
  const [slip, setSlip] = useState<BettingSlip>(initialSlip);
  const [isGenerating, setIsGenerating] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

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

  const handleDownload = async () => {
    if (slip.matches.length === 0) {
      toast({
        title: "No matches to download",
        description: "Please add at least one match before downloading.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      if (!downloadRef.current) {
        throw new Error("Download reference is not available");
      }

      // Determine image dimensions based on number of matches
      const isFiveOrFewerMatches = slip.matches.length <= 5;
      const imageHeight = isFiveOrFewerMatches ? 1080 : 1350;

      // Temporarily move the element to be visible for capture
      const hiddenElement = downloadRef.current.parentElement;
      if (hiddenElement) {
        hiddenElement.style.position = "fixed";
        hiddenElement.style.top = "0px";
        hiddenElement.style.left = "0px";
        hiddenElement.style.zIndex = "9999";
        hiddenElement.style.opacity = "1";
      }

      // Wait for layout to settle
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(downloadRef.current, {
        width: 1080,
        height: imageHeight,
        scale: 3,
        useCORS: true,
        backgroundColor: "#1a1a2e",
        allowTaint: true,
        foreignObjectRendering: false,
        logging: false,
        removeContainer: true,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // Ensure all fonts are loaded
          const style = clonedDoc.createElement("style");
          style.textContent = `
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
          `;
          clonedDoc.head.appendChild(style);
        },
      });

      // Move element back to hidden position
      if (hiddenElement) {
        hiddenElement.style.position = "fixed";
        hiddenElement.style.top = "-9999px";
        hiddenElement.style.left = "-9999px";
        hiddenElement.style.zIndex = "-1";
        hiddenElement.style.opacity = "0";
      }

      // Create download link
      const link = document.createElement("a");
      link.download = `BetSmart+${new Date().toISOString().split("T")[0]}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();

      toast({
        title: "Download successful",
        description: "Your betting slip has been downloaded as an image.",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Download failed",
        description:
          "There was an error generating the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Betting Slip Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Matches Section */}
          <Card>
            <CardHeader>
              <CardTitle>Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {slip.matches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {match.homeTeam} vs {match.awayTeam}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {match.pick} @ {match.odds}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <span className="text-xs font-bold">
                        {getStatusIcon(match.status)}
                      </span>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant={
                            match.status === "won" ? "default" : "outline"
                          }
                          className="p-1 h-8 w-8"
                          onClick={async () => {
                            // Update local state immediately for UI feedback
                            const updatedMatches = slip.matches.map((m) =>
                              m.id === match.id
                                ? {
                                    ...m,
                                    status: "won" as Match["status"],
                                  }
                                : m
                            );
                            setSlip({ ...slip, matches: updatedMatches });

                            // Update backend
                            await onUpdateMatchStatus(slipId, match.id, "won");
                          }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            match.status === "lost" ? "default" : "outline"
                          }
                          className="p-1 h-8 w-8"
                          onClick={async () => {
                            // Update local state immediately for UI feedback
                            const updatedMatches = slip.matches.map((m) =>
                              m.id === match.id
                                ? {
                                    ...m,
                                    status: "lost" as Match["status"],
                                  }
                                : m
                            );
                            setSlip({ ...slip, matches: updatedMatches });

                            // Update backend
                            await onUpdateMatchStatus(slipId, match.id, "lost");
                          }}
                        >
                          <XCircle className="w-4 h-4 text-red-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            match.status === "cancelled" ? "default" : "outline"
                          }
                          className="p-1 h-8 w-8"
                          onClick={async () => {
                            // Update local state immediately for UI feedback
                            const updatedMatches = slip.matches.map((m) =>
                              m.id === match.id
                                ? {
                                    ...m,
                                    status: "cancelled" as Match["status"],
                                  }
                                : m
                            );
                            setSlip({ ...slip, matches: updatedMatches });

                            // Update backend
                            await onUpdateMatchStatus(
                              slipId,
                              match.id,
                              "cancelled"
                            );
                          }}
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleDownload} disabled={isGenerating}>
              <Download className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Download Image"}
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Hidden full-size preview for screenshot */}
      <div
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          pointerEvents: "none",
          opacity: "0",
          zIndex: "-1",
        }}
      >
        <BettingSlipPreview
          ref={downloadRef}
          bettingSlip={slip}
          showStatus={true}
        />
      </div>
    </Dialog>
  );
};
