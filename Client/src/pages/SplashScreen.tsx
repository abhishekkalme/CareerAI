import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { AlertTriangle, Wifi, WifiOff, ArrowRight, Brain } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bandwidth, setBandwidth] = useState<string | null>(null);
  const [bandwidthLevel, setBandwidthLevel] = useState<"low" | "medium" | "high" | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const tips = [
    "Explore your personalized career path in 2 steps.",
    "Small progress daily leads to big results.",
    "Ask the AI mentor anytime for guidance.",
    "Your dream career is within reach!"
  ];

  useEffect(() => {
    const interval = setInterval(() => setTipIndex(prev => (prev + 1) % tips.length), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const checkBandwidth = async () => {
    try {
      const fileUrl = `https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?nocache=${Date.now()}`;
      const response = await fetch(fileUrl, { cache: "no-store" });
      if (!response.body) return;

      const reader = response.body.getReader();
      let receivedBytes = 0;
      const startTime = performance.now();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        receivedBytes += value?.length || 0;
        const elapsed = (performance.now() - startTime) / 1000;
        const speedBps = receivedBytes / elapsed;

        if (speedBps < 1024) {
          setBandwidth(`${speedBps.toFixed(2)} B/s`);
          setBandwidthLevel("low");
        } else if (speedBps < 1024 * 1024) {
          const kbps = speedBps / 1024;
          setBandwidth(`${kbps.toFixed(2)} KB/s`);
          setBandwidthLevel(kbps < 100 ? "low" : "medium");
        } else {
          setBandwidth(`${(speedBps / (1024 * 1024)).toFixed(2)} MB/s`);
          setBandwidthLevel("high");
        }
      }
    } catch {
      setBandwidth(null);
      setBandwidthLevel(null);
    }
  };

  useEffect(() => {
    if (!isOnline) return;
    checkBandwidth();
    const interval = setInterval(checkBandwidth, 15000);
    return () => clearInterval(interval);
  }, [isOnline]);

  useEffect(() => {
    if (!isOnline) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadingProgress(0);
    setShowSuccess(false);

    const duration = 2000;
    const intervalTime = 15;
    const totalTicks = duration / intervalTime;
    let tick = 0;

    const progressInterval = setInterval(() => {
      tick++;
      const progress = Math.min((tick / totalTicks) * 100, 100);
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(progressInterval);
        setIsLoading(false);
        setShowSuccess(true);

        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setShowSuccess(false);
            onComplete();
          }, 100);
        }, 1500);
      }
    }, intervalTime);

    return () => clearInterval(progressInterval);
  }, [isOnline, onComplete]);

  const handleRetry = () => {
    setLoadingProgress(0);
    setIsLoading(true);
    setIsOnline(navigator.onLine);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
        bg-gradient-to-br from-indigo-50 via-white to-blue-50 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4
        transition-all duration-500 ease-in-out
        ${fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
    >
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center">
            <Brain className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Career AI Guidance
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Personalized career paths & insights for students
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <div className="flex justify-center items-center mb-4">
            {isOnline ? (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <Wifi className="w-5 h-5 mr-2" /> Connected
              </div>
            ) : (
              <div className="flex items-center text-red-600 dark:text-red-400">
                <WifiOff className="w-5 h-5 mr-2" /> Offline
              </div>
            )}
          </div>

          {isOnline && bandwidth && (
            <p
              className={`text-center text-sm mb-3 ${
                bandwidthLevel === "low"
                  ? "text-red-600"
                  : bandwidthLevel === "medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {bandwidth} ({bandwidthLevel})
            </p>
          )}

          {isLoading && isOnline && (
            <div className="space-y-3">
              <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-100 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                {tips[tipIndex]}
              </p>
            </div>
          )}

          {showSuccess && !isLoading && isOnline && (
            <div className="text-center space-y-2">
              <p className="text-green-600 dark:text-green-400 font-medium">
                Ready to explore your career path!
              </p>
              <Button
                onClick={onComplete}
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white w-full flex items-center justify-center"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {!isOnline && (
            <div className="text-center space-y-3">
              <AlertTriangle className="mx-auto w-10 h-10 text-amber-500" />
              <p className="text-amber-600 dark:text-amber-400 font-medium">
                No Internet Connection
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Check your connection and retry
              </p>
              <Button
                onClick={handleRetry}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Retry
              </Button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Lightweight & responsive, works even on slow connections
        </p>
      </div>
    </div>
  );
}
