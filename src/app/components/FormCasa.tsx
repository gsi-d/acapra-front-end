import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@/app/components/input';
import CheckBox from '@/app/components/CheckBox';

export default function MoradiaForm() {
  const [possuiEspacoExterno, setPossuiEspacoExterno] = React.useState(false);
  const [espacoFechado, setEspacoFechado] = React.useState(false);

  return (
    <Box
      sx={{
        backgroundColor: '#E5E5E5',
        padding: 3,
        borderRadius: 2,
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Checkboxes no topo, um por linha */}
        <FormControlLabel
          control={<CheckBox value={possuiEspacoExterno} onChange={() => setPossuiEspacoExterno((v) => !v)} />}
          label="Possui espaço externo (quintal/jardim)?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={espacoFechado} onChange={() => setEspacoFechado((v) => !v)} />}
          label="O espaço é todo fechado/murado?"
          sx={{ color: 'black' }}
        />

        {/* TextFields abaixo, um por linha */}
        <Input label="Tipo de moradia (Casa, Apartamento, Sítio/chácara)" required />
        <Input label="A residência é (Própria ou Alugada)?" required />
      </Box>
    </Box>
  );
}
