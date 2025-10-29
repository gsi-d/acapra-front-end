"use client";

import { usePathname, useRouter } from "next/navigation";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { useState, useEffect } from "react"; 
import MenuSuperior from "./components/MenuSuperior";
import { useSessao } from "@/contextos/ContextoSessao";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/";
  const { sessao, ready } = useSessao();
  const [menuOpen, setMenuOpen] = useState(true);

  // Redirect to login if not remembered/logged when visiting protected routes
  useEffect(() => {
    if (!isClient || !ready) return;
    if (!isLogin && !sessao.logado) {
      router.push("/");
    }
  }, [isClient, ready, isLogin, sessao.logado, router]);

  if (!isClient) {
    return null;
  }

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
        <Box sx={{ minHeight: '80vh' }}>
          <MenuSuperior />
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
