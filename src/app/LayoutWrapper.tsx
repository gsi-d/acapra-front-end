"use client";

import { usePathname } from "next/navigation";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { useState } from "react";
import MenuSuperior from "./components/MenuSuperior";

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

        }}
      >
        <Box sx={{minHeight: '80vh'}}>
          <MenuSuperior />
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
