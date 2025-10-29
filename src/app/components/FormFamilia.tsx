import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@/app/components/input';
import CheckBox from '@/app/components/CheckBox';

export interface FamiliaValues {
  temCriancas: boolean;
  familiaConcorda: boolean;
  possuiAlergia: boolean;
  possuiOutrosAnimais: boolean;
  teveAnimaisAntes: boolean;
  qtdPessoas: number | string;
  idadesCriancas: string;
}

export default function FamiliaForm({
  values,
  onChange,
}: {
  values: FamiliaValues;
  onChange: (patch: Partial<FamiliaValues>) => void;
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
          control={<CheckBox value={values.temCriancas} onChange={() => onChange({ temCriancas: !values.temCriancas })} />}
          label="Há crianças na casa?"
          sx={{ color: 'black' }}
        />
        {/* Idades logo abaixo do checkbox de crianças */}
        <Input
          label="Se sim, quais as idades?"
          value={values.idadesCriancas}
          onChange={(e) => onChange({ idadesCriancas: e.target.value })}
        />
        <FormControlLabel
          control={<CheckBox value={values.familiaConcorda} onChange={() => onChange({ familiaConcorda: !values.familiaConcorda })} />}
          label="Todos os membros da família concordam com a adoção?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={values.possuiAlergia} onChange={() => onChange({ possuiAlergia: !values.possuiAlergia })} />}
          label="Alguém da casa possui alergia a animais?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={values.possuiOutrosAnimais} onChange={() => onChange({ possuiOutrosAnimais: !values.possuiOutrosAnimais })} />}
          label="Já possui outros animais?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={values.teveAnimaisAntes} onChange={() => onChange({ teveAnimaisAntes: !values.teveAnimaisAntes })} />}
          label="Já teve animais anteriormente?"
          sx={{ color: 'black' }}
        />

        {/* TextFields abaixo, um por linha */}
        <Input
          label="Quantas pessoas moram na sua casa?"
          required
          type="number"
          value={values.qtdPessoas}
          onChange={(e) => onChange({ qtdPessoas: e.target.value })}
        />
      </Box>
    </Box>
  );
}
