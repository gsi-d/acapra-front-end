'use client';
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MenuSuperior() {
  const [mode, setMode] = useState<string>("light");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("isAdm");
    localStorage.removeItem("emailSalvo");
    setAnchorEl(null);
    router.push("/");
  };
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "13%",
        height: "6%",
        position: "fixed",
        top: 15,
        right: 25,
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <IconButton>
          <LanguageIcon fontSize="large" color="action" />
        </IconButton>
        <IconButton
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? (
            <DarkModeIcon fontSize="large" color="action" />
          ) : (
            <LightModeIcon fontSize="large" color="action" />
          )}
        </IconButton>
        <IconButton>
          <NotificationsIcon fontSize="large" color="action" />
        </IconButton>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 36, height: 36 }}
              alt="avatar"
              src="/images/image-avatar.jpg"
            ></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Perfil
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Card>
  );
}
