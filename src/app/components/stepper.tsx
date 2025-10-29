'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

// Importando os formulários
import FormAdotante from '@/app/components/FormAdotante';
import FormFamilia from '@/app/components/FormFamilia';
import FormMoradia from '@/app/components/FormCasa';
import FormCuidados from '@/app/components/FormCuidados';
import FormDadosPet from '@/app/components/FormDadosPet';
import { Card } from '@mui/material';

const steps = [
  'Dados do pet',
  'Dados do Adotante',
  'Sobre você e sua Família',
  'Sobre a moradia',
  'Sobre cuidados e convivência',
];

export default function HorizontalLinearAlternativeLabelStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

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

  // Retorna o componente correspondente ao passo atual
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <FormDadosPet />;
      case 1:
        return <FormAdotante />;
      case 2:
        return <FormFamilia />;
      case 3:
        return <FormMoradia />;
      case 4:
        return <FormCuidados />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', marginTop:'16px' }}>
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
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
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
      </Box>
    </Box>
  );
}
