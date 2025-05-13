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
    Genero: string;
    Status: string;
    Vacinado: boolean;
    DataNascimento: string;
}