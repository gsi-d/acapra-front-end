import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@/app/components/input';

export default function FamiliaForm() {
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
      <Input label="Quantas pessoas moram na sua casa?" required />
      <Input label="Há crianças? Se sim, quais as idades?" required />
      <Input label="Todos os membros da família concordam com a adoção?" required />
      <Input label="Alguém da casa possui alergia a animais?" required />
      <Input label="Já possui outros animais? Quais?" required />
      <Input label="Já teve animais anteriormente? O que aconteceu com eles?" required />
    </Box>
  );
}
