import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ApiTest = () => {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const testApiConnection = async () => {
    setLoading(true);
    setStatus("Testing API connection...");

    try {
      const response = await fetch("http://localhost:3001/api/health");
      const data = await response.json();

      if (response.ok) {
        setStatus(`Success: ${data.message}`);
      } else {
        setStatus(`Error: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      setStatus(
        `Connection failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button onClick={testApiConnection} disabled={loading}>
            {loading ? "Testing..." : "Test API Connection"}
          </Button>
        </div>
        {status && (
          <div className="p-3 rounded-md bg-gray-100">
            <p className="text-sm">{status}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
