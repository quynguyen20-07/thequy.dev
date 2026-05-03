import { ReactNode } from "react";

interface TechCloudProps {
  children: ReactNode;
  className?: string;
}

export default function TechCloud({ children }: TechCloudProps) {
  return <>{children}</>;
}
