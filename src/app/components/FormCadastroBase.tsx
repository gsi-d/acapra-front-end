import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

interface FormDialogProps {
    titulo: string
    open: boolean;
    setOpen: (param: boolean) => void;
    onSubmit: () => void;
    children?: React.ReactNode
}

export default function FormCadastroBase(props: FormDialogProps) {
    const {titulo, open, setOpen, onSubmit, children} = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 800 } }}
        slotProps={{
          paper: {
            component: 'form',
          },
        }}
      >
        <DialogTitle variant="h5" color='secondary'>{titulo}</DialogTitle>
        <Divider/>
          {children}
        <DialogActions>
          <Button variant='outlined' color="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' color='secondary' onClick={onSubmit}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}