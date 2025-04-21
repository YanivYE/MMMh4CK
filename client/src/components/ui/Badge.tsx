import React from "react";

export const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`px-2 py-1 text-xs rounded ${className}`}>{children}</span>
);