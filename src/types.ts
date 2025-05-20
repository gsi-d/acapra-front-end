import { useState } from "react";
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

export const racasArray: OptionType[] = [
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

export const usuariosArray: OptionType[] = [
  { id: '1', title: 'João Silva' },
  { id: '2', title: 'Maria Oliveira' },
  { id: '3', title: 'Carlos Souza' },
  { id: '4', title: 'Ana Paula' },
  { id: '5', title: 'Ricardo Lima' },
];


export interface Pet{
    id?: number;
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
    TutorResponsavel?: string;
    Resgatado: boolean;
    DataResgate?: string;
    LocalResgate?: string;
}

export interface Raca{
    Pet: any;
    id?: number;
    Especie: enumEspecie;
    Nome: string;
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
    Id_Usuario: string;
    Id_Pet: string;
    Data: string;
    Status: enumStatus;
    Observacoes: string;
}

    
export const rowsPet : Pet[] = [{ 
    id: 1, 
    Nome: 'Bela', 
    Especie: 'Gato', 
    Raca: 'Persa', 
    Genero: 'Fêmea', 
    Status: 'Disponível', 
    Peso: 3.5, 
    Adotado: true, 
    Vacinado: false, 
    TutorResponsavel: 'Ana', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '05/02/2018' 
},
{ 
    id: 2, 
    Nome: 'Rufus', 
    Especie: 'Cachorro', 
    Raca: 'Labrador', 
    Genero: 'Macho', 
    Status: 'Adotado', 
    Peso: 25, 
    Adotado: true, 
    Vacinado: true, 
    TutorResponsavel: 'Carlos', 
    Resgatado: true, 
    LocalResgate: 'Rua', 
    DataNascimento: '22/09/2015' 
},
{ 
    id: 3, 
    Nome: 'Sansão', 
    Especie: 'Cachorro', 
    Raca: 'Pitbull', 
    Genero: 'Macho', 
    Status: 'Disponível', 
    Peso: 15, 
    Adotado: false, 
    Vacinado: false, 
    TutorResponsavel: 'João', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '13/11/2021' 
},
{ 
    id: 4, 
    Nome: 'Lua', 
    Especie: 'Gato', 
    Raca: 'Siamês', 
    Genero: 'Fêmea', 
    Status: 'Disponível', 
    Peso: 3, 
    Adotado: false, 
    Vacinado: false, 
    TutorResponsavel: 'Mariana', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '14/05/2020' 
},
{ 
    id: 5, 
    Nome: 'Branca', 
    Especie: 'Cachorro', 
    Raca: 'Poodle', 
    Genero: 'Fêmea', 
    Status: 'Disponível', 
    Peso: 5, 
    Adotado: false, 
    Vacinado: false, 
    TutorResponsavel: 'Fernanda', 
    Resgatado: true, 
    LocalResgate: 'Avenida', 
    DataNascimento: '05/02/2018' 
},
{ 
    id: 6, 
    Nome: 'Max', 
    Especie: 'Cachorro', 
    Raca: 'Golden Retriever', 
    Genero: 'Macho', 
    Status: 'Disponível', 
    Peso: 30, 
    Adotado: false, 
    Vacinado: true, 
    TutorResponsavel: 'Lucas', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '08/06/2020' 
},
{ 
    id: 7, 
    Nome: 'Mia', 
    Especie: 'Gato', 
    Raca: 'Maine Coon', 
    Genero: 'Fêmea', 
    Status: 'Disponível', 
    Peso: 4, 
    Adotado: false, 
    Vacinado: false, 
    TutorResponsavel: 'Roberta', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '11/01/2019' 
},
{ 
    id: 8, 
    Nome: 'Rex', 
    Especie: 'Cachorro', 
    Raca: 'Dobermann', 
    Genero: 'Macho', 
    Status: 'Adotado', 
    Peso: 40, 
    Adotado: true, 
    Vacinado: true, 
    TutorResponsavel: 'Carlos', 
    Resgatado: true, 
    LocalResgate: 'Praça', 
    DataNascimento: '07/12/2017' 
},
{ 
    id: 9, 
    Nome: 'Nina', 
    Especie: 'Gato', 
    Raca: 'Bengal', 
    Genero: 'Fêmea', 
    Status: 'Disponível', 
    Peso: 3, 
    Adotado: false, 
    Vacinado: false, 
    TutorResponsavel: 'Julia', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '23/04/2021' 
},
{ 
    id: 10, 
    Nome: 'Charlie', 
    Especie: 'Cachorro', 
    Raca: 'Bulldog', 
    Genero: 'Macho', 
    Status: 'Disponível', 
    Peso: 20, 
    Adotado: false, 
    Vacinado: true, 
    TutorResponsavel: 'Roberto', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '01/09/2018' 
},
{ 
    id: 11, 
    Nome: 'Luna', 
    Especie: 'Gato', 
    Raca: 'Persa', 
    Genero: 'Fêmea', 
    Status: 'Adotado', 
    Peso: 3.2, 
    Adotado: true, 
    Vacinado: true, 
    TutorResponsavel: 'Monique', 
    Resgatado: true, 
    LocalResgate: 'Lagoa', 
    DataNascimento: '15/07/2020' 
},
{ 
    id: 12, 
    Nome: 'Thor', 
    Especie: 'Cachorro', 
    Raca: 'Husky', 
    Genero: 'Macho', 
    Status: 'Disponível', 
    Peso: 25, 
    Adotado: false, 
    Vacinado: false, 
    TutorResponsavel: 'Eduardo', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '25/03/2019' 
},
{ 
    id: 13, 
    Nome: 'Bella', 
    Especie: 'Gato', 
    Raca: 'Siamês', 
    Genero: 'Fêmea', 
    Status: 'Disponível', 
    Peso: 3.8, 
    Adotado: false, 
    Vacinado: true, 
    TutorResponsavel: 'Carmen', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '10/08/2017' 
},
{ 
    id: 14, 
    Nome: 'Simba', 
    Especie: 'Cachorro', 
    Raca: 'Pastor Alemão', 
    Genero: 'Macho', 
    Status: 'Adotado', 
    Peso: 35, 
    Adotado: true, 
    Vacinado: true, 
    TutorResponsavel: 'Beatriz', 
    Resgatado: true, 
    LocalResgate: 'Rua', 
    DataNascimento: '14/02/2016' 
},
{ 
    id: 15, 
    Nome: 'Zara', 
    Especie: 'Gato', 
    Raca: 'Bengal', 
    Genero: 'Fêmea', 
    Status: 'Disponível', 
    Peso: 4, 
    Adotado: false, 
    Vacinado: false, 
    TutorResponsavel: 'Flávia', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '18/05/2021' 
},
{ 
    id: 16, 
    Nome: 'Oscar', 
    Especie: 'Cachorro', 
    Raca: 'Bulldog', 
    Genero: 'Macho', 
    Status: 'Adotado', 
    Peso: 22, 
    Adotado: true, 
    Vacinado: true, 
    TutorResponsavel: 'Felipe', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '12/11/2018' 
},
{ 
    id: 17, 
    Nome: 'Cleo', 
    Especie: 'Gato', 
    Raca: 'Angorá', 
    Genero: 'Fêmea', 
    Status: 'Disponível', 
    Peso: 2.5, 
    Adotado: false, 
    Vacinado: false, 
    TutorResponsavel: 'Beatriz', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '20/06/2020' 
},
{ 
    id: 18, 
    Nome: 'Toby', 
    Especie: 'Cachorro', 
    Raca: 'Shih Tzu', 
    Genero: 'Macho', 
    Status: 'Disponível', 
    Peso: 6, 
    Adotado: false, 
    Vacinado: true, 
    TutorResponsavel: 'Juliana', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '04/10/2021' 
},
{ 
    id: 19, 
    Nome: 'Pepper', 
    Especie: 'Gato', 
    Raca: 'Siamês', 
    Genero: 'Fêmea', 
    Status: 'Adotado', 
    Peso: 3, 
    Adotado: true, 
    Vacinado: true, 
    TutorResponsavel: 'Renata', 
    Resgatado: true, 
    LocalResgate: 'Praça', 
    DataNascimento: '02/02/2019' 
},
{ 
    id: 20, 
    Nome: 'Buddy', 
    Especie: 'Cachorro', 
    Raca: 'Beagle', 
    Genero: 'Macho', 
    Status: 'Disponível', 
    Peso: 10, 
    Adotado: false, 
    Vacinado: true, 
    TutorResponsavel: 'Fernanda', 
    Resgatado: false, 
    LocalResgate: 'N/A', 
    DataNascimento: '29/08/2020' 
}];

export const petsOptionArray: OptionType[] = rowsPet.map(pet => ({
  id: pet.id ? pet.id.toString() : '',
  title: pet.Nome,
}));
