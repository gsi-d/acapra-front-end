import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export interface AlertaProps{
    mensagem: string;
    severity: 'error' | 'info' | 'success' | 'warning';
    open: boolean;
}

export default function Alerta(props : AlertaProps) {
    const {mensagem, severity, open} = props;
    const [internoOpen, setInternoOpen] = useState<boolean>(open);

  // Controla visibilidade local com timeout de 5s
  useEffect(() => {
    setInternoOpen(open);
    if (open) {
      const timer = setTimeout(() => {
        setInternoOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Snackbar
      open={internoOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={() => {
        setInternoOpen(false);
      }}
    >
      <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
        {mensagem}
      </Alert>
    </Snackbar>
  );
}