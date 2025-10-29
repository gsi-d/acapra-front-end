'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ComboBox, { OptionType } from '@/app/components/ComboBox';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  TextField,
} from '@mui/material';
import { enumEspecie, enumGenero, enumPorte, Pet, tbPet, statusArray } from '@/types';
import { calcularIdade } from '@/app/util/DataHelper';
import { listarPets, retornarFotosPorPet, FiltroPets } from '@/services/pets';
import { listarRacas } from '@/services/entities';

const especies: OptionType[] = [
  { id: 1, title: 'Cachorro' },
  { id: 2, title: 'Gato' },
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
  // Estados com OptionType ou null
  const [especie, setEspecie] = React.useState<OptionType | null>(null);
  const [porte, setPorte] = React.useState<OptionType | null>(null);
  const [sexo, setSexo] = React.useState<OptionType | null>(null);
  const [raca, setRaca] = React.useState<OptionType | null>(null);
  const [status, setStatus] = React.useState<OptionType | null>(null);
  const [idade, setIdade] = React.useState<number | ''>('');
  const [nome, setNome] = React.useState('');
  const [pets, setPets] = React.useState<tbPet[] | undefined>(undefined);
  const [fotoMap, setFotoMap] = React.useState<Record<string, string>>({});
  const [racasOptions, setRacasOptions] = React.useState<OptionType[]>([]);

  const fetchAnimals = async (f?: FiltroPets) => {
    try {
      const data = await listarPets(f);
      setPets(data);
      // Carrega fotos dos pets em paralelo e cria um mapa id -> url
      const entries = await Promise.all(
        (data || []).map(async (p) => {
          const id = p.id_pet;
          if (!id) return [String(id ?? ''), ''] as const;
          try {
            const fotos = await retornarFotosPorPet(id);
            return [String(id), (fotos && fotos.length > 0) ? fotos[0] : ''] as const;
          } catch {
            return [String(id), ''] as const;
          }
        })
      );
      const map: Record<string, string> = {};
      for (const [id, url] of entries) map[id] = url;
      setFotoMap(map);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    // Carrega opções de raças
    (async () => {
      try {
        const racas = await listarRacas();
        const opts: OptionType[] = (racas || []).map((r: any) => ({
          id: r.id ?? r.id_raca ?? 0,
          title: r.Nome ?? r.tb_raca_nome_raca ?? r.nome ?? ''
        }));
        setRacasOptions(opts);
      } catch {}
    })();
    fetchAnimals();
  }, []);

  useEffect(() => {
    console.log('pets', pets);
  }, [pets]);

  function handleBuscar() {
    const filtros: FiltroPets = {};
    if (especie?.id) filtros.especie = Number(especie.id);
    if (porte?.id) filtros.porte = Number(porte.id);
    if (sexo?.id) filtros.genero = Number(sexo.id);
    if (raca?.id) filtros.raca = Number(raca.id);
    if (status?.id) filtros.status = Number(status.id);
    if (nome && nome.trim()) filtros.nome = nome.trim();
    if (idade !== '' && Number(idade) >= 0) filtros.idade = Number(idade);
    fetchAnimals(filtros);
  }

  return (
    <Card className="p-8 max-w-7xl mx-auto" sx={{ mt: '5vh' }}>
      <Typography variant="h4" mb={4} sx={{ color: '#7C3AED' }}>
        Buscar animal
      </Typography>

      {/* Filtros em grid: 3 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Linha 1 */}
        <div className="md:col-span-2 col-span-1">
          <TextField
            fullWidth
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            size="small"
          />
        </div>
        <div className="col-span-1">
          <ComboBox label="Espécie" options={especies} value={especie} setValue={setEspecie} />
        </div>

        {/* Linha 2 */}
        <div className="col-span-1">
          <ComboBox label="Raça" options={racasOptions} value={raca} setValue={setRaca} />
        </div>
        <div className="col-span-1">
          <ComboBox label="Porte" options={portes} value={porte} setValue={setPorte} />
        </div>
        <div className="col-span-1">
          <ComboBox label="Gênero" options={sexos} value={sexo} setValue={setSexo} />
        </div>

        {/* Linha 3 */}
        <div className="col-span-1">
          <ComboBox label="Status" options={statusArray} value={status} setValue={setStatus} />
        </div>
        <div className="col-span-1">
          <TextField
            fullWidth
            label="Idade (anos)"
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value === '' ? '' : Number(e.target.value))}
            size="small"
          />
        </div>
        <div className="col-span-1" />
      </div>
      <div className="mt-4 mb-6">
        <Button variant="contained" color="secondary" onClick={handleBuscar}>
          Buscar
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {pets && pets.map((animal) => (
          <Card
            key={animal.id_pet}
            onClick={() => router.push(`/animal/${animal.id_pet}`)}
            className="cursor-pointer hover:shadow-lg transition"
          >
            <CardMedia
              component="img"
              sx={{ height: 180, objectFit: 'cover' }}
              image={
                (fotoMap[String(animal.id_pet ?? '')] && fotoMap[String(animal.id_pet ?? '')].length > 0)
                  ? fotoMap[String(animal.id_pet ?? '')]
                  : '/images/patas.png'
              }
              alt={animal.tb_pet_nome}
            />
            <CardContent>
              <Typography variant="h6">{animal.tb_pet_nome}</Typography>
              {/* Raça exibida como chip junto com os demais */}
              <div className="mt-2 flex flex-wrap gap-2">
                {animal.tb_raca_nome && (
                  <Chip label={animal.tb_raca_nome} variant="outlined" />
                )}
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


