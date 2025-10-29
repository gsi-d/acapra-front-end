'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

// Importando os formulários
import FormAdotante from '@/app/components/FormAdotante';
import FormFamilia, { FamiliaValues } from '@/app/components/FormFamilia';
import FormMoradia, { MoradiaValues } from '@/app/components/FormCasa';
import FormCuidados, { CuidadosValues } from '@/app/components/FormCuidados';
import FormDadosPet from '@/app/components/FormDadosPet';
import { Card } from '@mui/material';
import { useSessao } from '@/contextos/ContextoSessao';
import { criarAdocao } from '@/services/entities';
import Alerta, { AlertaParams } from '@/app/components/Alerta';
import { useRouter } from 'next/navigation';

const steps = [
  'Dados do pet',
  'Dados do Adotante',
  'Sobre você e sua Família',
  'Sobre a moradia',
  'Sobre cuidados e convivência',
];

export default function HorizontalLinearAlternativeLabelStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { sessao } = useSessao();
  const router = useRouter();

  // Estados centrais do wizard
  const [selectedPetId, setSelectedPetId] = React.useState<number | null>(null);
  const [familia, setFamilia] = React.useState<FamiliaValues>({
    temCriancas: false,
    familiaConcorda: false,
    possuiAlergia: false,
    possuiOutrosAnimais: false,
    teveAnimaisAntes: false,
    qtdPessoas: '',
    idadesCriancas: '',
  });
  const [moradia, setMoradia] = React.useState<MoradiaValues>({
    possuiEspacoExterno: false,
    espacoFechado: false,
    tipoMoradia: '',
    residencia: '',
  });
  const [cuidados, setCuidados] = React.useState<CuidadosValues>({
    cienteCustos: false,
    dispostoVeterinario: false,
    compromissoVida: false,
    motivo: '',
    responsavel: '',
    tempoSozinho: '',
  });

  const [alertaOpen, setAlertaOpen] = React.useState(false);
  const [alertaParams, setAlertaParams] = React.useState<AlertaParams>({ mensagem: '', severity: 'success' });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const toTF = (b: boolean) => (b ? 'TRUE' : 'FALSE');
  async function handleSalvar() {
    // Monta payload conforme contrato do backend
    const hoje = new Date().toISOString().slice(0, 10);
    const payload: Record<string, any> = {
      id_pet: selectedPetId ?? null,
      id_usuario: sessao.userId ?? null,
      tb_adocao_data_adocao: hoje,
      tb_adocao_qtd_pessoas: Number(familia.qtdPessoas || 0),
      tb_adocao_ha_criancas: toTF(Boolean(familia.temCriancas)),
      tb_adocao_idades_criancas: Number(familia.idadesCriancas || 0),
      tb_adocao_todos_concordam: toTF(Boolean(familia.familiaConcorda)),
      tb_adocao_alguem_alergia: toTF(Boolean(familia.possuiAlergia)),
      tb_adocao_ja_possuiu_animais: toTF(Boolean(familia.teveAnimaisAntes)),
      tb_adocao_destino_animais_anteriores: toTF(Boolean(familia.teveAnimaisAntes)),
      tb_adocao_residencia: moradia.residencia || null,
      tb_adocao_possui_espaco_externo: toTF(Boolean(moradia.possuiEspacoExterno)),
      tb_adocao_local_animal: 'Casa',
      tb_adocao_motivo_adocao: cuidados.motivo || null,
      tb_adocao_responsavel_cuidados: cuidados.responsavel || null,
      tb_adocao_tempo_sozinho: Number(cuidados.tempoSozinho || 0),
      tb_adocao_ciente_custos: toTF(Boolean(cuidados.cienteCustos)),
      tb_adocao_disposto_veterinario: toTF(Boolean(cuidados.dispostoVeterinario)),
      tb_adocao_compromisso_vida: toTF(Boolean(cuidados.compromissoVida)),
      tb_adocao_inativo: 'FALSE',
    };
    try {
      await criarAdocao(payload);
      setAlertaParams({ mensagem: 'Adoção registrada com sucesso', severity: 'success' });
      setAlertaOpen(true);
      setTimeout(() => {
        router.push('/geral/catalogo');
      }, 1000);
    } catch (e) {
      setAlertaParams({ mensagem: 'Falha ao registrar a adoção', severity: 'error' });
      setAlertaOpen(true);
    }
  }

  // Retorna o componente correspondente ao passo atual
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <FormDadosPet selectedPetId={selectedPetId} onChangePetId={setSelectedPetId} />;
      case 1:
        return <FormAdotante />;
      case 2:
        return <FormFamilia values={familia} onChange={(p) => setFamilia((prev) => ({ ...prev, ...p }))} />;
      case 3:
        return <FormMoradia values={moradia} onChange={(p) => setMoradia((prev) => ({ ...prev, ...p }))} />;
      case 4:
        return <FormCuidados values={cuidados} onChange={(p) => setCuidados((prev) => ({ ...prev, ...p }))} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', marginTop:'16px' }}>
      <Alerta open={alertaOpen} setAlertaOpen={setAlertaOpen} params={alertaParams} />
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          '& .MuiStepIcon-root': { color: '#ccc' },
          '& .MuiStepIcon-root.Mui-active': { color: '#7C3AED' },
          '& .MuiStepIcon-root.Mui-completed': { color: '#7C3AED' },
          '& .MuiStepLabel-label.Mui-active': { color: '#7C3AED' },
          '& .MuiStepLabel-label.Mui-completed': { color: '#7C3AED' },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Conteúdo do passo atual */}
      <Box sx={{ mt: 4, mb: 4 }}>
        {getStepContent(activeStep)}
      </Box>

      {/* Botões de navegação */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom:'16px',}}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{
            color: '#7C3AED',
            borderColor: '#7C3AED',
            '&:hover': {
              backgroundColor: 'rgba(124, 58, 237, 0.04)',
              borderColor: '#7C3AED',
            },
          }}
        >
          Voltar
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSalvar}
            sx={{
              backgroundColor: '#7C3AED',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#6B21A8',
              },
            }}
          >
            Salvar
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              backgroundColor: '#7C3AED',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#6B21A8',
              },
            }}
          >
            Próximo
          </Button>
        )}
      </Box>
    </Box>
  );
}
