"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Typography, Chip, Button, Card } from '@mui/material';
import { retornarPet } from '@/services/pets';
import { calcularIdade } from '@/app/util/DataHelper';

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [animal, setAnimal] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const pet = await retornarPet(Number(id));
        if (!pet) {
          setAnimal(null);
          return;
        }
        const especie = pet.Especie === 1 ? 'cachorro' : 'gato';
        const sexo = pet.Genero === 1 ? 'macho' : 'femea';
        const idade = pet.DataNascimento ? `${calcularIdade(pet.DataNascimento)} anos` : '';
        setAnimal({
          id: pet.id,
          nome: pet.Nome,
          especie,
          sexo,
          raca: pet.Id_Raca,
          porte: '',
          idade,
          imagem: 'https://placedog.net/500?id=' + (pet.id ?? 1),
          descricao: 'Animal disponível para adoção.',
          tags: [pet.Vacinado ? 'Vacinado' : ''].filter(Boolean),
        });
      } catch (e) {
        setAnimal(null);
      }
    };
    load();
  }, [id]);

  function handleClickQueroAdotar() {
    router.push('/geral/adocao');
  }

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
            onClick={handleClickQueroAdotar}
          >
            Quero Adotar
          </Button>
        </div>
      </Card>
    </Box>
  );
}

