import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface AlertaParams {
  mensagem: string;
  severity: "error" | "info" | "success" | "warning";
}

export interface AlertaProps {
  open: boolean;
  setAlertaOpen: (param: boolean) => void;
  params: AlertaParams;
}

export default function Alerta(props: AlertaProps) {
  const {
    params: { mensagem, severity },
    open,
    setAlertaOpen,
  } = props;

  useEffect(() => {
    console.log(open);
  }, [open]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setAlertaOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={() => {
        setAlertaOpen(false);
      }}
    >
      <Box>
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertaOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {mensagem}
        </Alert>
      </Box>
    </Snackbar>
  );
}
