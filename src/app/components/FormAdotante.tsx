// src/app/components/AdotanteForm.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@/app/components/input';

export default function AdotanteForm() {
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
        gap: 2, // espaçamento entre os inputs
      }}
    >
      <Input label="Nome" required />
      <Input label="CEP" required />
      <Input label="Endereço" required />
      <Input label="Número" required />
      <Input label="Bairro" required />
      <Input label="Cidade" required />
      <Input label="Data de Nascimento" required />
      <Input label="CPF" required />
      <Input label="Email" required />
      <Input label="Profissão" required />
    </Box>
  );
}
