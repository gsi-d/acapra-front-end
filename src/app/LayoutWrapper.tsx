"use client";

import { usePathname } from "next/navigation";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLogin = pathname === "/login"; // ou outra rota que quiser ignorar menu/footer

  if (isLogin) {
    // Tela login: só renderiza o conteúdo, sem menu e footer
    return <>{children}</>;
  }

  // Demais páginas com menu e footer
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Menu />
      <div className="bg-gray-100 w-full ml-[30vh]">
        <div className="bg-gray-100 w-full p-5 " style={{ minHeight: '80vh' }}>
          {children}
        </div>
        <Footer />
      </div>
    </Box>
  );
}
