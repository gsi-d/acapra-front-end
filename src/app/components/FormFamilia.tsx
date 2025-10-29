import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@/app/components/input';
import CheckBox from '@/app/components/CheckBox';

export default function FamiliaForm() {
  const [temCriancas, setTemCriancas] = React.useState(false);
  const [familiaConcorda, setFamiliaConcorda] = React.useState(false);
  const [possuiAlergia, setPossuiAlergia] = React.useState(false);
  const [possuiOutrosAnimais, setPossuiOutrosAnimais] = React.useState(false);
  const [teveAnimaisAntes, setTeveAnimaisAntes] = React.useState(false);

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
          control={<CheckBox value={temCriancas} onChange={() => setTemCriancas((v) => !v)} />}
          label="Há crianças na casa?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={familiaConcorda} onChange={() => setFamiliaConcorda((v) => !v)} />}
          label="Todos os membros da família concordam com a adoção?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={possuiAlergia} onChange={() => setPossuiAlergia((v) => !v)} />}
          label="Alguém da casa possui alergia a animais?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={possuiOutrosAnimais} onChange={() => setPossuiOutrosAnimais((v) => !v)} />}
          label="Já possui outros animais?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={teveAnimaisAntes} onChange={() => setTeveAnimaisAntes((v) => !v)} />}
          label="Já teve animais anteriormente?"
          sx={{ color: 'black' }}
        />

        {/* TextFields abaixo, um por linha */}
        <Input label="Quantas pessoas moram na sua casa?" required type="number" />
        <Input label="Se sim, quais as idades?" />
      </Box>
    </Box>
  );
}
