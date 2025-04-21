import React from "react";

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border p-4 shadow ${className}`}>{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>;
export const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <h3 className={className}>{children}</h3>;
export const CardContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const CardFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>;