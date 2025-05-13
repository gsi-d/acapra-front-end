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