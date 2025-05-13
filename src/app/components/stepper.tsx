import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Dados do Adotante',
  'Sobre você e sua Família',
  'Sobre a moradia',
  'Sobre cuidados e convivência',
];

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={1}
        alternativeLabel
        sx={{
          '& .MuiStepIcon-root': {
            color: '#ccc', // ícones inativos
          },
          '& .MuiStepIcon-root.Mui-active': {
            color: '#7C3AED', // ícone ativo
          },
          '& .MuiStepIcon-root.Mui-completed': {
            color: '#7C3AED', // ícones concluídos
          },
          '& .MuiStepLabel-label.Mui-active': {
            color: '#7C3AED', // texto ativo
          },
          '& .MuiStepLabel-label.Mui-completed': {
            color: '#7C3AED', // texto concluído
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
