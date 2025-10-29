// src/app/components/AdotanteForm.tsx
"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@/app/components/input';
import { useSessao } from '@/contextos/ContextoSessao';
import { retornarUsuario } from '@/services/entities';

export default function AdotanteForm() {
  const { sessao } = useSessao();
  const [loading, setLoading] = React.useState(false);
  const [dados, setDados] = React.useState<any | null>(null);

  React.useEffect(() => {
    (async () => {
      if (!sessao?.userId) return;
      try {
        setLoading(true);
        const u = await retornarUsuario(Number(sessao.userId));
        setDados(u || null);
      } finally {
        setLoading(false);
      }
    })();
  }, [sessao?.userId]);

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
      {/* Campos desabilitados preenchidos com dados do usuário */}
      <Input label="Nome" value={dados?.tb_usuario_nome ?? ''} disabled />
      <Input label="Email" value={dados?.tb_usuario_email ?? ''} disabled />
      <Input label="Telefone" value={dados?.tb_usuario_telefone ?? ''} disabled />
      <Input label="Data de Nascimento" value={dados?.tb_usuario_data_nascimento ?? ''} disabled />
      <Input label="CEP" value={dados?.tb_usuario_cep ?? ''} disabled />
      <Input label="Rua" value={dados?.tb_usuario_rua ?? ''} disabled />
      <Input label="Número" value={dados?.tb_usuario_numero ?? ''} disabled />
      <Input label="Bairro" value={dados?.tb_usuario_bairro ?? ''} disabled />
      <Input label="Cidade" value={dados?.tb_usuario_cidade ?? ''} disabled />
      <Input label="Estado" value={dados?.tb_usuario_estado ?? ''} disabled />
      <Input label="Complemento" value={dados?.tb_usuario_complemento ?? ''} disabled />
    </Box>
  );
}
