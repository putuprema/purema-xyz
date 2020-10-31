import React from "react";

export interface ViewportContextInterface {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

export const ViewportContext = React.createContext<ViewportContextInterface>({
  isDesktop: true,
  isTablet: false,
  isMobile: false,
});
