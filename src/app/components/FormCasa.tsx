import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@/app/components/input';
import CheckBox from '@/app/components/CheckBox';

export interface MoradiaValues {
  possuiEspacoExterno: boolean;
  espacoFechado: boolean;
  tipoMoradia: string;
  residencia: string;
}

export default function MoradiaForm({
  values,
  onChange,
}: {
  values: MoradiaValues;
  onChange: (patch: Partial<MoradiaValues>) => void;
}) {
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
          control={<CheckBox value={values.possuiEspacoExterno} onChange={() => onChange({ possuiEspacoExterno: !values.possuiEspacoExterno })} />}
          label="Possui espaço externo (quintal/jardim)?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={values.espacoFechado} onChange={() => onChange({ espacoFechado: !values.espacoFechado })} />}
          label="O espaço é todo fechado/murado?"
          sx={{ color: 'black' }}
        />

        {/* TextFields abaixo, um por linha */}
        <Input
          label="Tipo de moradia (Casa, Apartamento, Sítio/chácara)"
          required
          value={values.tipoMoradia}
          onChange={(e) => onChange({ tipoMoradia: e.target.value })}
        />
        <Input
          label="A residência é (Própria ou Alugada)?"
          required
          value={values.residencia}
          onChange={(e) => onChange({ residencia: e.target.value })}
        />
      </Box>
    </Box>
  );
}

