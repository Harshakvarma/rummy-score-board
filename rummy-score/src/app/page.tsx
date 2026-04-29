"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const RouterComponent = dynamic(() => import("../components/RouterComponent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      Loading...
    </div>
  ),
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <RouterComponent />;
}
