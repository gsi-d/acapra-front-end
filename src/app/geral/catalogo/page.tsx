'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ComboBox, { OptionType } from '@/app/components/ComboBox'; // ajuste o caminho conforme seu projeto
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
} from '@mui/material';
import { enumEspecie, enumGenero, enumPorte, Pet, tbPet } from '@/types';
import { calcularIdade } from '@/app/util/DataHelper';
import { listarPets } from '@/services/pets';

const especies: OptionType[] = [
    { id: 1, title: 'Cachorro' },
    { id: 2, title: 'Gato' },
];

const estados: OptionType[] = [
    { id: 1, title: 'SP' },
    { id: 2, title: 'RJ' },
];

const portes: OptionType[] = [
    { id: 1, title: 'Pequeno' },
    { id: 2, title: 'Médio' },
    { id: 3, title: 'Grande' },
];

const sexos: OptionType[] = [
    { id: 1, title: 'Macho' },
    { id: 2, title: 'Fêmea' },
];

export default function Page() {
    const router = useRouter();
    // Estados com OptionType ou undefined
    const [especie, setEspecie] = React.useState<OptionType | null>(null);
    const [estado, setEstado] = React.useState<OptionType | null>(null);
    const [porte, setPorte] = React.useState<OptionType | null>(null);
    const [sexo, setSexo] = React.useState<OptionType | null>(null);
    const [cidade, setCidade] = React.useState('');
    const [nome, setNome] = React.useState('');
    const [pets, setPets] = React.useState<tbPet[] | undefined>(undefined);

    const fetchAnimals = async () => {
        try {
            const data = await listarPets();
            setPets(data);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    useEffect(() => {
        console.log('pets', pets);
    }, [pets]);

    return (
        <Card className="p-8 max-w-7xl mx-auto" sx={{  mt: '5vh'}}>
            <Typography variant="h4" mb={4} sx={{ color: "#7C3AED" }}>
                Buscar animal
            </Typography>

            <div className="flex flex-wrap gap-6">
                <div className='flex gap-6'>

                    <div className="w-48">
                        <ComboBox
                            label="Espécie"
                            options={especies}
                            value={especie}
                            setValue={setEspecie}
                        />
                    </div>

                    <div className="w-48">
                        <ComboBox
                            label="Estado"
                            options={estados}
                            value={estado}
                            setValue={setEstado}
                        />
                    </div>

                    <div className="w-48">
                        <ComboBox
                            label="Porte"
                            options={portes}
                            value={porte}
                            setValue={setPorte}
                        />
                    </div>

                    <div className="w-48">
                        <ComboBox
                            label="Sexo"
                            options={sexos}
                            value={sexo}
                            setValue={setSexo}
                        />
                    </div>
                </div>

            </div>
            <div className='flex gap-6 mt-6'>
                <div className="w-48">
                    <label className="block">
                        <span className="text-gray-700">Cidade</span>
                        <input
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1"
                        />
                    </label>
                </div>

                <div className="w-48">
                    <label className="block">
                        <span className="text-gray-700">Nome do bicho</span>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1"
                        />
                    </label>
                </div>
                <div className="mt-6 mb-10">
                    <Button variant="contained" color="secondary">
                        Buscar
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                {pets && pets.map((animal) => (
                    <Card key={animal.id_pet} onClick={() => router.push(`/animal/${animal.id_pet}`)} className="cursor-pointer hover:shadow-lg transition">
                        <CardMedia
                            component="img"
                            height="200"
                            image={`https://placedog.net/500?id=${animal.id_pet}`}
                            alt={animal.tb_pet_nome}
                        />
                        <CardContent>
                            <Typography variant="h6">{animal.tb_pet_nome}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {animal.id_raca}
                            </Typography>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <Chip
                                    label={animal.tb_pet_genero === enumGenero.MASCULINO ? 'Macho' : 'Fêmea'}
                                    color={animal.tb_pet_genero === enumGenero.MASCULINO ? 'primary' : 'secondary'}
                                />
                                <Chip label={enumPorte[animal.tb_pet_porte]} variant="outlined" />
                                <Chip label={`${calcularIdade(animal.tb_pet_data_nascimento)} anos(s)`} color="primary" variant="outlined" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Card>
    );
}
