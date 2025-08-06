import { BettingSlipGenerator } from "@/components/BettingSlipGenerator";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BettingSlip } from "@/types/match";
import { Button } from "@/components/ui/button";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [initialSlip, setInitialSlip] = useState<BettingSlip | null>(null);

  useEffect(() => {
    if (location.state && (location.state as { slip?: BettingSlip }).slip) {
      setInitialSlip((location.state as { slip?: BettingSlip }).slip || null);
    }
  }, [location.state]);

  return (
    <div>
      <div className="container mx-auto max-w-7xl py-4">
        <div className="flex justify-end space-x-2">
          <Button onClick={() => navigate("/analytics")} variant="outline">
            Analytics
          </Button>
          <Button onClick={() => navigate("/saved")} variant="outline">
            View Saved Slips
          </Button>
        </div>
      </div>
      <BettingSlipGenerator initialSlip={initialSlip} />
    </div>
  );
};

export default Index;
