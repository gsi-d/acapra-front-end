"use client";

import { usePathname } from "next/navigation";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { useState } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(true);

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Menu open={menuOpen} toggleOpen={() => setMenuOpen((v) => !v)} />
      
      <Box
        className="bg-gray-100 w-full"
        sx={{
          ml: menuOpen ? "28.5vh" : "70px",
          transition: "margin-left 0.3s",
          width: "100%",
          minHeight: "80vh",

        }}
      >
        {children}
        <Footer />
      </Box>
    </Box>
  );
}
