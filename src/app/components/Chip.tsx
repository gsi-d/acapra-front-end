import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { enumEspecie, enumGenero, enumStatus } from '@/types';

interface ChipTextoProps{
    enumchip?: any;
    value?: any;
}
export default function ChipTexto(props: ChipTextoProps) {
  const {enumchip, value} = props;

  const texto = retornaTexto(value);
  const cor = retornaCor(value);

  function retornaCor(value: any){
    switch(enumchip){
      case enumEspecie:
        switch(value){
          case enumEspecie.CACHORRO:
            return 'primary';
          case enumEspecie.GATO:
            return 'error';
        }
      case enumGenero:
        switch(value){
          case enumGenero.MASCULINO:
            return 'info';
          case enumGenero.FEMININO:
            return 'secondary';
        }
      case enumStatus:
        switch(value){
          case enumStatus.DISPONIVEL:
            return 'success';
          case enumStatus.ADOTADO:
            return 'warning';
        }
      default:
        return 'default';
    }
  }

  function retornaTexto(value: any){
    switch(enumchip){
      case enumEspecie:
        switch(value){
          case enumEspecie.CACHORRO:
            return 'Cachorro';
          case enumEspecie.GATO:
            return 'Gato';
        }
      case enumGenero:
        switch(value){
          case enumGenero.MASCULINO:
            return 'Macho';
          case enumGenero.FEMININO:
            return 'Fêmea';
        }
      case enumStatus:
        switch(value){
          case enumStatus.DISPONIVEL:
            return 'Disponível';
          case enumStatus.ADOTADO:
            return 'Adotado';
        }
      default:
        return 'default';
    }
  }

  return (
      <Chip {...props} label={texto} color={cor} />
  );
}