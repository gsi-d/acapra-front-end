import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@/app/components/input';
import CheckBox from '@/app/components/CheckBox';

export interface CuidadosValues {
  cienteCustos: boolean;
  dispostoVeterinario: boolean;
  compromissoVida: boolean;
  motivo: string;
  responsavel: string;
  tempoSozinho: number | string;
}

export default function CuidadosForm({
  values,
  onChange,
}: {
  values: CuidadosValues;
  onChange: (patch: Partial<CuidadosValues>) => void;
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
          control={<CheckBox value={values.cienteCustos} onChange={() => onChange({ cienteCustos: !values.cienteCustos })} />}
          label="Está ciente dos custos com alimentação, vacinas e saúde?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={values.dispostoVeterinario} onChange={() => onChange({ dispostoVeterinario: !values.dispostoVeterinario })} />}
          label="Está disposto a levar o animal ao veterinário regularmente?"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={<CheckBox value={values.compromissoVida} onChange={() => onChange({ compromissoVida: !values.compromissoVida })} />}
          label="Está ciente de que adoção é um compromisso para toda a vida do animal?"
          sx={{ color: 'black' }}
        />

        {/* TextFields abaixo, um por linha */}
        <Input
          label="Por que você deseja adotar um animal?"
          required
          value={values.motivo}
          onChange={(e) => onChange({ motivo: e.target.value })}
        />
        <Input
          label="Quem será o responsável pelos cuidados diários?"
          required
          value={values.responsavel}
          onChange={(e) => onChange({ responsavel: e.target.value })}
        />
        <Input
          label="Quanto tempo por dia o animal ficará sozinho?"
          required
          type="number"
          value={values.tempoSozinho}
          onChange={(e) => onChange({ tempoSozinho: e.target.value })}
        />
      </Box>
    </Box>
  );
}

