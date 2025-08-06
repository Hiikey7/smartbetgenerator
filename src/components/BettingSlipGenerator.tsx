import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye } from "lucide-react";
import { MatchForm } from "./MatchForm";
import { BettingSlipPreview } from "./BettingSlipPreview";
import { SaveSlips } from "./SaveLoadSlips";
import { BettingSlip } from "@/types/match";
import { useToast } from "@/hooks/use-toast";

interface BettingSlipGeneratorProps {
  initialSlip?: BettingSlip | null;
}

export const BettingSlipGenerator = ({
  initialSlip,
}: BettingSlipGeneratorProps) => {
  const [bettingSlip, setBettingSlip] = useState<BettingSlip>(
    initialSlip || {
      matches: [],
      paripesaCode: "uvfgt5",
      afropariCode: "uvfgt5",
      secretBetCode: "uvfgt5",
      totalOdds: 1,
      date: "",
      name: "",
    }
  );
  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!downloadRef.current || bettingSlip.matches.length === 0) {
      toast({
        title: "No matches to download",
        description: "Please add at least one match before downloading.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
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

      // Determine image dimensions based on number of matches
      const isFiveOrFewerMatches = bettingSlip.matches.length <= 5;
      const imageWidth = 1080;
      const imageHeight = isFiveOrFewerMatches ? 1080 : 1350;

      const canvas = await html2canvas(downloadRef.current, {
        width: imageWidth,
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
    <div
      className="min-h-screen bg-gray-50 p-2 sm:p-4"
      style={{ paddingBottom: "0" }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="mb-4 sm:mb-6 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-betting-header mb-1">
            Smart<span className="text-betting-orange">Bets</span> Generator
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Create betting slips with up to 10 matches
          </p>
        </div>
        {/* Mobile Layout: Sequential order, Desktop: Grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {/* Left Column - Form Section, Download Button, and Summary */}
          <div className="space-y-4 sm:space-y-6">
            <MatchForm
              onBettingSlipChange={(slip) => {
                setBettingSlip(slip);
                setIsSaved(false);
              }}
              initialSlip={initialSlip}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <SaveSlips
                currentBettingSlip={bettingSlip}
                onSlipSaved={() => setIsSaved(true)}
              />
              <Button
                onClick={handleDownload}
                disabled={bettingSlip.matches.length === 0 || isGenerating}
                className="flex items-center justify-center gap-1 w-full sm:w-auto h-9 text-sm"
              >
                <Download className="w-3 h-3" />
                {isGenerating ? "Generating..." : "Download"}
              </Button>
            </div>

            {/* Summary Section - Shows after matches */}
            {bettingSlip.matches.length > 0 && (
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg">
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Total Matches:</span>
                      <span className="font-medium">
                        {bettingSlip.matches.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Odds:</span>
                      <span className="font-medium text-betting-orange">
                        {bettingSlip.totalOdds.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paripesa Code:</span>
                      <span className="font-medium break-all">
                        {bettingSlip.paripesaCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Afropari Code:</span>
                      <span className="font-medium break-all">
                        {bettingSlip.afropariCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>SecretBet Code:</span>
                      <span className="font-medium break-all">
                        {bettingSlip.secretBetCode}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Preview Section */}
          <div className="flex justify-center overflow-hidden">
            {bettingSlip.matches.length > 0 ? (
              <div className="w-full max-w-full overflow-hidden flex justify-center">
                <div
                  className="origin-top flex-shrink-0"
                  style={{
                    transform: "scale(0.25)",
                    width: "1080px",
                    height: "337.5px",
                    marginBottom: "0",
                  }}
                >
                  <BettingSlipPreview bettingSlip={bettingSlip} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 sm:h-48 lg:h-64 bg-gray-100 rounded border border-dashed border-gray-300 w-full">
                <div className="text-center px-4">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Add matches to see your betting slip preview
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
        <BettingSlipPreview ref={downloadRef} bettingSlip={bettingSlip} />
      </div>

      {/* Website Footer with Credits */}
      <footer
        className="py-3 text-center bg-gray-100 border-t"
        style={{ marginBottom: "0" }}
      >
        <div className="text-xs text-gray-600">
          <span>Powered by </span>
          <a
            href="https://wa.me/message/5MJVAG2CZN25M1"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
            style={{ color: "#ec8a2b" }}
          >
            Stanpixels Creatives
          </a>
        </div>
      </footer>
    </div>
  );
};
