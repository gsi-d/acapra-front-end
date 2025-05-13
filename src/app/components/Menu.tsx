import Link from 'next/link';
import NavLinks from './NavLink';
import PetsIcon from '@mui/icons-material/Pets';
import { Box, Typography } from '@mui/material';

export default function Menu() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        ml: 2,
        py: 2,
        pr: 2,
        width: '28.5vh',
        zIndex: 999,
        boxShadow: '3px 0px 8px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-15"
        href="/"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} className="w-32 text-purple-800 md:w-40">
          <PetsIcon fontSize="large" />
          <Typography fontSize={30}>Acapra</Typography>
        </Box>
      </Link>
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </Box>
  );
}
