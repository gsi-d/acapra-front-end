import { OptionType } from "./app/components/ComboBox";

export enum ERole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export enum enumEspecie{
    CACHORRO = 'Cachorro',
    GATO = 'Gato',
}

export enum enumGenero{
    MASCULINO = 'Macho',
    FEMININO = 'Fêmea',
}

export enum enumStatus{
    DSIPONIVEL = 'Disponível',
    ADOTADO = 'Adotado',
}

export const especiesArray: OptionType[] = [
  { id: enumEspecie.CACHORRO, title: 'Cachorro' },
  { id: enumEspecie.GATO, title: 'Gato' },
];

export const generosArray: OptionType[] = [
  { id: enumGenero.MASCULINO, title: 'Macho' },
  { id: enumGenero.FEMININO, title: 'Fêmea' },
];

export const statusArray: OptionType[] = [
  { id: enumStatus.DSIPONIVEL, title: 'Disponível' },
  { id: enumStatus.ADOTADO, title: 'Adotado' },
];


export interface Pet{
    id: number;
    Nome: string;
    Especie: string;
    Raca: string;
    Genero: string;
    Status: string;
    DataNascimento: string;
    Peso: number;
    Adotado: boolean;
    DataAdocao?: string;
    Vacinado: boolean;
    DataUltimaVacina?: string;
    TutorResponsavel: string;
    Resgatado: boolean;
    DataResgate?: string;
    LocalResgate: string;
}

