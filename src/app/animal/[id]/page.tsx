'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Typography, Chip, Button, Card } from '@mui/material';

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
    descricao: 'Rodrigo Faro é um cachorro muito simpático e brincalhão. Está esperando um lar cheio de amor.',
    tags: ['Vacinado', 'Castrado', 'FELV+', 'Vira-Lata', 'Brincalhão']
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
    descricao: 'Essa é a versão feminina do Rodrigo Faro. Doce, amorosa e pronta para ser adotada.',
    tags: ['Vacinado', 'FELV+', 'Vira-Lata']
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
    descricao: 'Mais um Rodrigo Faro! Cheio de energia e amor pra dar.',
    tags: ['Castrado', 'Manso', 'Vira-Lata']
  },
];

export default function Page() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<any | null>(null);

  useEffect(() => {
    const encontrado = mockAnimals.find((a) => a.id === Number(id));
    setAnimal(encontrado || null);
  }, [id]);

  if (!animal) return <Typography className="p-8">Animal não encontrado.</Typography>;

  return (
    <Box className="flex p-8 max-w-5xl mx-auto items-center" sx={{ height: '80vh' }}>
      <Card className="flex flex-col md:flex-row gap-10 py-10 px-6">
        <div className="md:w-1/2">
          <img
            src={animal.imagem}
            alt={animal.nome}
            className="rounded-xl w-full h-auto"
          />
          <div className="flex gap-2 mt-4 justify-center">
            <img src={animal.imagem} alt="thumb" className="w-16 h-16 rounded-lg cursor-pointer" />
            <img src={animal.imagem} alt="thumb" className="w-16 h-16 rounded-lg cursor-pointer" />
            <img src={animal.imagem} alt="thumb" className="w-16 h-16 rounded-lg cursor-pointer" />
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <Typography variant="h4" color="primary" fontWeight="bold">
            {animal.nome}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {animal.especie} | {animal.sexo === 'macho' ? 'Macho' : 'Fêmea'} | {animal.idade} | {animal.porte}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" color='textSecondary'>
            Descrição
          </Typography>
          <Typography variant="body2" color='textSecondary'>
            {animal.descricao}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" color="secondary">
            Mais Detalhes
          </Typography>
          <div className="flex flex-wrap gap-2">
            {animal.tags.map((tag: string, idx: number) => (
              <Chip key={idx} label={tag} variant="outlined" color="primary" />
            ))}
          </div>

          <Button
            variant="contained"
            color="primary"
            className="mt-4 self-start"
          >
            Quero Adotar
          </Button>
        </div>
      </Card>
    </Box>
  );
}
