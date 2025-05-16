'use client';
import React from 'react';
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

const especies: OptionType[] = [
  { id: 'cachorro', title: 'Cachorro' },
  { id: 'gato', title: 'Gato' },
];

const estados: OptionType[] = [
  { id: 'SP', title: 'SP' },
  { id: 'RJ', title: 'RJ' },
];

const portes: OptionType[] = [
  { id: 'pequeno', title: 'Pequeno' },
  { id: 'medio', title: 'Médio' },
  { id: 'grande', title: 'Grande' },
];

const sexos: OptionType[] = [
  { id: 'macho', title: 'Macho' },
  { id: 'femea', title: 'Fêmea' },
];

const mockAnimals = [
  {
    id: 1,
    nome: 'Rodrigo Faro',
    especie: 'cachorro',
    sexo: 'macho',
    raca: 'Vira-Lata',
    porte: 'medio',
    idade: '2 anos',
    imagem: 'https://placedog.net/500?id=1',
  },
  {
    id: 2,
    nome: 'Rodrigo Faro',
    especie: 'cachorro',
    sexo: 'femea',
    raca: 'Vira-Lata',
    porte: 'medio',
    idade: '2 anos',
    imagem: 'https://placedog.net/500?id=2',
  },
  {
    id: 3,
    nome: 'Rodrigo Faro',
    especie: 'cachorro',
    sexo: 'macho',
    raca: 'Vira-Lata',
    porte: 'medio',
    idade: '2 anos',
    imagem: 'https://placedog.net/500?id=3',
  },
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

  // Filtragem usando os ids das opções selecionadas
  const animaisFiltrados = mockAnimals.filter((animal) => {
    return (
      (especie ? animal.especie === especie.id : true) &&
      (sexo ? animal.sexo === sexo.id : true) &&
      (porte ? animal.porte === porte.id : true) &&
      (nome ? animal.nome.toLowerCase().includes(nome.toLowerCase()) : true)
      // Estado e cidade não estão no mock, mas você pode usar depois
    );
  });

  return (
    <Box className="p-8 max-w-7xl mx-auto">
      <Typography variant="h6" mb={4} color='black'>
        Buscar animal
      </Typography>

      <div className="flex flex-wrap gap-6">
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
      </div>

      <div className="mt-6 mb-10">
        <Button variant="contained" color="primary">
          Buscar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {animaisFiltrados.map((animal) => (
          <Card key={animal.id} onClick={() => router.push(`/animal/${animal.id}`)} className="cursor-pointer hover:shadow-lg transition">
            <CardMedia
              component="img"
              height="200"
              image={animal.imagem}
              alt={animal.nome}
            />
            <CardContent>
              <Typography variant="h6">{animal.nome}</Typography>
              <Typography variant="body2" color="text.secondary">
                {animal.raca}
              </Typography>
              <div className="mt-2 flex flex-wrap gap-2">
                <Chip
                  label={animal.sexo === 'macho' ? 'Macho' : 'Fêmea'}
                  color={animal.sexo === 'macho' ? 'primary' : 'secondary'}
                />
                <Chip label={animal.porte} variant="outlined" />
                <Chip label={animal.idade} color="primary" variant="outlined" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
  );
}
