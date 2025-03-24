import { ToolsData } from "@/type/tools-type";
import { createContext, useContext } from "react";

export type GlobaleContextType = {
  activeTags: string[];
  toolsData: ToolsData | undefined;
};

export const GlobaleContext = createContext<GlobaleContextType | undefined>(
  undefined
);

export function useGlobaleContext() {
  const context = useContext(GlobaleContext);
  if (context === undefined) {
    throw new Error("useGlobaleContext must be used within a GlobaleProvider");
  }
  return context;
}
