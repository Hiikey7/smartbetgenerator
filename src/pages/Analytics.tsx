import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/config/api";

interface MatchStatusData {
  date: string;
  won: number;
  lost: number;
  cancelled: number;
}

const Analytics = () => {
  const [sevenDaysData, setSevenDaysData] = useState<MatchStatusData[]>([]);
  const [thirtyDaysData, setThirtyDaysData] = useState<MatchStatusData[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if backend is running
  const checkBackendHealth = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.HEALTH);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  // Fetch analytics data from backend
  const fetchAnalyticsData = async () => {
    try {
      // Check if backend is running
      const isBackendRunning = await checkBackendHealth();
      if (!isBackendRunning) {
        throw new Error(
          "Backend server is not running. Please start the backend server."
        );
      }

      console.log("Fetching analytics data...");
      const response = await fetch(API_ENDPOINTS.ANALYTICS);
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(
          `Failed to fetch analytics data: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Analytics data received:", result);

      setSevenDaysData(result.data.sevenDays);
      setThirtyDaysData(result.data.thirtyDays);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      toast({
        title: "Error",
        description: `Failed to load analytics data: ${error.message}. Please ensure the backend server is running.`,
        variant: "destructive",
      });
    }
  };

  // Load analytics data when component mounts and set up interval for real-time updates
  useEffect(() => {
    fetchAnalyticsData();

    // Set up interval to fetch data every 10 seconds for more real-time updates
    const interval = setInterval(() => {
      fetchAnalyticsData();
    }, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-betting-header mb-2">
            Betting <span className="text-betting-orange">Analytics</span>
          </h1>
          <p className="text-gray-600">
            View statistics for your betting performance
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
          <Button
            onClick={() => navigate("/saved")}
            variant="outline"
            className="mr-2"
          >
            View Saved Slips
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 7 Days Analytics */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-base sm:text-lg">
                Last 7 Days Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sevenDaysData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 110,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="won" name="Won" fill="#10B981" />
                    <Bar dataKey="lost" name="Lost" fill="#EF4444" />
                    <Bar dataKey="cancelled" name="Cancelled" fill="#9CA3AF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 30 Days Analytics */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-base sm:text-lg">
                Last 30 Days Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={thirtyDaysData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 110,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="won" name="Won" fill="#10B981" />
                    <Bar dataKey="lost" name="Lost" fill="#EF4444" />
                    <Bar dataKey="cancelled" name="Cancelled" fill="#9CA3AF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-green-500 text-base sm:text-lg">
                Total Won
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-4">
              <p className="text-3xl font-bold text-green-500">
                {sevenDaysData.reduce((sum, day) => sum + day.won, 0)}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Last 7 days
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-red-500 text-base sm:text-lg">
                Total Lost
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-4">
              <p className="text-3xl font-bold text-red-500">
                {sevenDaysData.reduce((sum, day) => sum + day.lost, 0)}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Last 7 days
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-gray-500 text-base sm:text-lg">
                Total Cancelled
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-4">
              <p className="text-3xl font-bold text-gray-500">
                {sevenDaysData.reduce((sum, day) => sum + day.cancelled, 0)}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Last 7 days
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
