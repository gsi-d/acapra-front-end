import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@/app/components/input';

export default function MoradiaForm() {
  return (
    <Box
      sx={{
        backgroundColor: '#E5E5E5',
        padding: 3,
        borderRadius: 2,
        maxWidth: 900,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Input label="Tipo de moradia (Casa, Apartamento, Sítio/chácara)" required />
      <Input label="A residência é (Própria ou Alugada)?" required />
      <Input label="Possui espaço externo (quintal/jardim)?" required />
      <Input label="O espaço é todo fechado/murado?" required />
      <Input label="O animal ficará (Dentro, Fora ou Livre acesso)?" required />
    </Box>
  );
}
