import { forwardRef } from "react";
import { BettingSlip } from "@/types/match";

interface BettingSlipPreviewProps {
  bettingSlip: BettingSlip;
}

export const BettingSlipPreview = forwardRef<
  HTMLDivElement,
  BettingSlipPreviewProps
>(({ bettingSlip }, ref) => {
  const formatDate = () => {
    let dateToFormat: Date;

    if (bettingSlip.date) {
      // Use custom date if provided
      dateToFormat = new Date(bettingSlip.date);
    } else {
      // Default to current date
      dateToFormat = new Date();
    }

    return dateToFormat.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      ref={ref}
      className="w-[1080px] h-[1350px] relative overflow-hidden mx-auto"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: 0.1,
          zIndex: 999,
        }}
      >
        <img
          src="/watermark.png"
          alt="Watermark"
          style={{
            transform: "rotate(-45deg)",
            transformOrigin: "center center",
            width: "600px",
            height: "auto",
            willChange: "transform",
          }}
        />
      </div>
      {/* Header */}
      <div
        className="px-8 py-6 relative"
        style={{ backgroundColor: "#3e4095", color: "#ffffff" }}
      >
        <div className="flex justify-between items-center">
          <div style={{ padding: "10px" }}>
            <img
              src="/smartbetlogo.png"
              alt="SmartBets Logo"
              style={{
                height: "60px",
                width: "auto",
              }}
            />
          </div>
          <div
            className="text-3xl font-bold"
            style={{
              marginRight: "20px",
            }}
          >
            {formatDate()}
          </div>
        </div>
      </div>

      {/* Social Links Bar */}
      <div
        style={{
          backgroundColor: "#ec8a2b",
          color: "#ffffff",
          fontSize: "20px",
          fontWeight: "600",
          width: "1080px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <img
            src="/telegram.png"
            alt="Telegram"
            style={{
              width: "24px",
              height: "24px",
              display: "block",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            SmartbetsOfficial
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <img
            src="/twitter.png"
            alt="Twitter"
            style={{
              width: "24px",
              height: "24px",
              display: "block",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            SmartbetsKe
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <img
            src="/whatsapp.png"
            alt="WhatsApp"
            style={{
              width: "24px",
              height: "24px",
              display: "block",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            +254708467323
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <img
            src="/web.png"
            alt="Website"
            style={{
              width: "24px",
              height: "24px",
              display: "block",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            www.smartbets.co.ke
          </span>
        </div>
      </div>

      {/* Matches */}
      <div
        className="px-8 py-6 space-y-3"
        style={{
          position: "relative",
          zIndex: 2,
          marginBottom: "160px",
        }}
      >
        {bettingSlip.matches.map((match, index) => {
          // Dynamic sizing based on number of matches
          const matchCount = bettingSlip.matches.length;
          const isLargeSize = matchCount <= 3;
          const isMediumSize = matchCount > 3 && matchCount <= 6;
          const isSmallSize = matchCount > 6;

          const matchHeight = isLargeSize
            ? "min-h-[140px]"
            : isMediumSize
            ? "min-h-[100px]"
            : "min-h-[80px]";
          const pickTextSize = isLargeSize
            ? "text-2xl"
            : isMediumSize
            ? "text-xl"
            : "text-lg";
          const teamTextSize = isLargeSize
            ? "text-xl"
            : isMediumSize
            ? "text-lg"
            : "text-base";
          const countryTextSize = isLargeSize
            ? "text-2xl"
            : isMediumSize
            ? "text-xl"
            : "text-lg";
          const timeTextSize = isLargeSize
            ? "text-xl"
            : isMediumSize
            ? "text-lg"
            : "text-base";
          const urlTextSize = isLargeSize
            ? "text-lg"
            : isMediumSize
            ? "text-base"
            : "text-sm";
          const oddsTextSize = isLargeSize
            ? "text-4xl"
            : isMediumSize
            ? "text-3xl"
            : "text-2xl";
          const paddingClass = isLargeSize
            ? "py-6"
            : isMediumSize
            ? "py-4"
            : "py-2";

          return (
            <div
              key={match.id}
              className={`flex ${matchHeight}`}
              style={{
                backgroundColor: "#ffffff",
                boxShadow:
                  "0 8px 25px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "15px",
              }}
            >
              {/* Left section with country and time */}
              <div
                className="text-white px-6 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#ec8a2b",
                  minWidth: "140px",
                  width: "140px",
                  borderRadius: "15px 0 0 15px",
                }}
              >
                <div className="text-center">
                  <div className={`${countryTextSize} font-bold leading-tight`}>
                    {match.country}
                  </div>
                  <div
                    className={`${timeTextSize} font-semibold mt-1 leading-tight`}
                  >
                    {match.time}
                  </div>
                </div>
              </div>

              {/* Middle section with match details */}
              <div
                className={`flex-1 px-6 ${paddingClass} flex flex-col justify-center min-w-0`}
                style={{ backgroundColor: "#ffffff" }}
              >
                <div
                  className={`${pickTextSize} font-bold mb-2 leading-tight`}
                  style={{
                    color: "#1f2937",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {match.pick}
                </div>
                <div
                  className={`${teamTextSize} mb-1 leading-tight font-semibold`}
                  style={{
                    color: "#374151",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {match.homeTeam}
                </div>
                <div
                  className={`${teamTextSize} leading-tight font-semibold`}
                  style={{
                    color: "#374151",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {match.awayTeam}
                </div>
              </div>

              {/* Website URL section */}
              <div
                className={`px-4 ${paddingClass} flex items-center justify-center flex-shrink-0`}
                style={{
                  minWidth: "200px",
                  width: "200px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  className={`${urlTextSize} font-semibold text-center leading-tight`}
                  style={{
                    color: "#1f2937",
                    whiteSpace: "nowrap",
                  }}
                >
                  {match.websiteUrl}
                </div>
              </div>

              {/* Right section with odds */}
              <div
                className="text-white px-6 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#ec8a2b",
                  minWidth: "100px",
                  width: "100px",
                  borderRadius: "0 15px 15px 0",
                }}
              >
                <div className={`${oddsTextSize} font-black`}>
                  {match.odds.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spacer between matches and footer */}
      <div style={{ height: "40px" }}></div>

      {/* Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 text-white px-8 py-6"
        style={{
          background: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
          boxShadow: "0 -4px 15px rgba(0, 0, 0, 0.3)",
          zIndex: 3,
          height: "80px",
        }}
      >
        <div className="flex justify-between items-center text-2xl">
          <div>
            <span style={{ fontWeight: "bold" }}>Paripesa:</span>
            <span style={{ fontWeight: "normal" }}>
              {bettingSlip.paripesaCode}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Afropari:</span>
            <span style={{ fontWeight: "normal" }}>
              {bettingSlip.afropariCode}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Total Odds:</span>
            <span style={{ fontWeight: "normal" }}>
              {bettingSlip.totalOdds.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

BettingSlipPreview.displayName = "BettingSlipPreview";
