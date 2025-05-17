'use client';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingProps {
  open: boolean;
}

export default function Loading({ open }: LoadingProps) {
  return (
    <Backdrop
      className='bg-black/30'
      sx={{ color: 'purple', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
