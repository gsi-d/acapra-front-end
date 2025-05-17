import Link from "next/link";
import NavLinks from "./NavLink";
import PetsIcon from "@mui/icons-material/Pets";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";

interface MenuProps {
  open: boolean;
  toggleOpen: () => void;
}

export default function Menu({ open, toggleOpen }: MenuProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        py: 1,
        pr: open ? 2 : 0,
        width: open ? "28.5vh" : "70px", // largura mínima para mostrar o ícone
        zIndex: 999,
        boxShadow: "3px 0px 8px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        overflowX: "hidden",
        transition: "width 0.3s",
      }}
    >
      {open ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "flex-end" : "center",
            gap: 2,
          }}
        >
          <Link
            className=" flex h-20 items-end justify-start rounded-md p-2 md:h-15"
            href="/geral/catalogo"
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
              className="w-32 text-purple-800 md:w-40"
            >
              <PetsIcon fontSize="large" />
              <Typography fontSize={30}>Acapra</Typography>
            </Box>
          </Link>
          <Tooltip title={open ? "Fechar menu" : "Abrir menu"}>
            <IconButton
              onClick={toggleOpen}
              size="large"
              aria-label="Toggle menu"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Tooltip title={open ? "Fechar menu" : "Abrir menu"}>
          <IconButton
            sx={{ mb: 1, height: "5vh", width: "5vh", left: 10 }}
            onClick={toggleOpen}
            size="large"
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      )}

      {open ? (
        <div className="flex grow p-3 flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks minimized={false} />
        </div>
      ) : (
        <div className="flex grow px-5 flex-col space-y-2 items-center">
          <NavLinks minimized={true} />
        </div>
      )}
    </Box>
  );
}
