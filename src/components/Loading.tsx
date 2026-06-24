"use client";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento da página
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de loading

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center transition-opacity duration-500"
      style={{
        backgroundColor: 'var(--body-color)',
        zIndex: 99999,
      }}
    >
      <CircularProgress 
        disableShrink 
        aria-label="Loading…"
        sx={{
          color: 'var(--button-color)',
        }}
        size={60}
      />
    </div>
  );
}
