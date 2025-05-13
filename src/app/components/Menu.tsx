import Link from 'next/link';
import PowerIcon from '@mui/icons-material/Power';
import NavLinks from './NavLink';
import PetsIcon from '@mui/icons-material/Pets';
import { Box, Typography } from '@mui/material';

export default function Menu() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 max-w-75">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md  p-4 md:h-15"
        href="/"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}} className="w-32 text-purple-800 md:w-40">
          <PetsIcon fontSize='large' />
          <Typography fontSize={30}>Acapra</Typography>
        </Box>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}