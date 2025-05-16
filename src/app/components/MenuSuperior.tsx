import { Avatar, Box, Card, IconButton } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from "react";

export default function MenuSuperior() {
    const [mode, setMode] = useState<string>('light');
    return (
        <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '13%', height: '6%', position: 'fixed', top: 15, right: 25, zIndex: 999}}>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                <IconButton>
                    <LanguageIcon fontSize="large" color="action"/>
                </IconButton>
                <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                    {mode === 'light' ? <DarkModeIcon fontSize="large" color="action" /> : <LightModeIcon fontSize="large" color="action" />}
                </IconButton>
                <IconButton>
                    <NotificationsIcon fontSize="large" color="action"/>
                </IconButton>
                <IconButton>
                    <Avatar alt="avatar" src='/images/image-avatar.jpg' />
                </IconButton>
            </Box>
        </Card>
    );
}