import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@/app/components/input';
import CheckBox from '@/app/components/CheckBox';

export default function CuidadosForm() {
  const [cienteCustos, setCienteCustos] = React.useState(false);
  const [dispostoVeterinario, setDispostoVeterinario] = React.useState(false);
  const [compromissoVida, setCompromissoVida] = React.useState(false);

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
          control={<CheckBox value={cienteCustos} onChange={() => setCienteCustos((v) => !v)} />}
          label="Está ciente dos custos com alimentação, vacinas e saúde?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={dispostoVeterinario} onChange={() => setDispostoVeterinario((v) => !v)} />}
          label="Está disposto a levar o animal ao veterinário regularmente?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={compromissoVida} onChange={() => setCompromissoVida((v) => !v)} />}
          label="Está ciente de que adoção é um compromisso para toda a vida do animal?"
          sx={{ color: 'black' }}
        />

        {/* TextFields abaixo, um por linha */}
        <Input label="Por que você deseja adotar um animal?" required />
        <Input label="Quem será o responsável pelos cuidados diários?" required />
        <Input label="Quanto tempo por dia o animal ficará sozinho?" required type="number" />
      </Box>
    </Box>
  );
}
