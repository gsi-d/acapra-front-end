import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@/app/components/input';

export default function CuidadosForm() {
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
      <Input label="Por que você deseja adotar um animal?" required />
      <Input label="Quem será o responsável pelos cuidados diários?" required />
      <Input label="Quanto tempo por dia o animal ficará sozinho?" required />
      <Input label="Está ciente dos custos com alimentação, vacinas e saúde?" required />
      <Input label="Está disposto a levar o animal ao veterinário regularmente?" required />
      <Input label="Está ciente de que adoção é um compromisso para toda a vida do animal?" required />
    </Box>
  );
}
