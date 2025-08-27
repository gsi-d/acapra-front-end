import { OptionType } from "./app/components/ComboBox";

export enum ERole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export enum enumEspecie{
    CACHORRO = 1,
    GATO = 2,
}

export enum enumGenero{
    MASCULINO = 1,
    FEMININO = 2,
}

export enum enumStatus{
    DISPONIVEL = 1,
    ADOTADO = 2,
}

export const especiesArray: OptionType[] = [
  { id: enumEspecie.CACHORRO, title: 'Cachorro' },
  { id: enumEspecie.GATO, title: 'Gato' },
];

export const racasArray: OptionType[] = [
  { id: 1, title: 'Cachorro' },
  { id: 2, title: 'Gato' },
];

export const generosArray: OptionType[] = [
  { id: enumGenero.MASCULINO, title: 'Macho' },
  { id: enumGenero.FEMININO, title: 'Fêmea' },
];

export const statusArray: OptionType[] = [
  { id: enumStatus.DISPONIVEL, title: 'Disponível' },
  { id: enumStatus.ADOTADO, title: 'Adotado' },
];

export const usuariosArray: OptionType[] = [
  { id: 1, title: 'João Silva' },
  { id: 2, title: 'Maria Oliveira' },
  { id: 3, title: 'Carlos Souza' },
  { id: 4, title: 'Ana Paula' },
  { id: 5, title: 'Ricardo Lima' },
];


export interface Pet{
    id?: number;
    Nome: string;
    Especie: enumEspecie;
    Id_Raca: number;
    Genero: enumGenero;
    Status: enumStatus;
    DataNascimento: string;
    Peso: number;
    Adotado: boolean;
    DataAdocao?: string;
    Vacinado: boolean;
    DataUltimaVacina?: string;
    TutorResponsavel?: string;
    Resgatado: boolean;
    DataResgate?: string;
    LocalResgate?: string;
}

export interface Raca{
    id?: number;
    Nome: string;
    Especie: enumEspecie;
}

export interface Vacina{
    id?: number;
    Nome: string;
    DataVacina: string;
}

export interface Doenca{
    id?: number;
    Nome: string;
    Descricao: string;
}

export interface Visita{
    id?: number;
    Id_Usuario: number;
    Id_Pet: number;
    Data: string;
    Status: enumStatus;
    Observacoes: string;
}

export function retornaPetsOptionArray(pets : Pet[]) {
    const petsOptionArray: OptionType[] = pets.map(pet => ({
        id: pet.id || 0,
        title: pet.Nome,
    }))
  return petsOptionArray;
}

export function retornaRacasOptionArray(racas : Raca[]) {
    const racasOptionArray: OptionType[] = racas.map(raca => ({
        id: raca.id || 0,
        title: raca.Nome,
    }))
  return racasOptionArray;
}
