import { Home, Building2, Hammer, PenTool } from "lucide-react";

export const getIcon = (title) => {
  const value = title.toLowerCase();

  if (value.includes("residential")) {
    return Home;
  }

  if (value.includes("commercial")) {
    return Building2;
  }

  if (value.includes("renovation")) {
    return Hammer;
  }

  return PenTool;
};
