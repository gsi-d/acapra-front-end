"use client";
import * as React from 'react';
import { Box, Card, Typography, Chip, IconButton } from '@mui/material';
import ComboBox, { OptionType } from '@/app/components/ComboBox';
import { listarPets, retornarPet, retornarFotosPorPet } from '@/services/pets';
import { useSearchParams } from 'next/navigation';
import { calcularIdade } from '@/app/util/DataHelper';
import TimelineDialog, { TimelineItem } from '@/app/components/TimelineDialog';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import dayjs from 'dayjs';

interface AnimalView {
  id: number;
  nome: string;
  especie: string;
  sexo: 'macho' | 'femea';
  raca: number | string | undefined;
  porte: string;
  idade: string;
  descricao: string;
  tags: string[];
}

export default function FormDadosPet({
  selectedPetId,
  onChangePetId,
}: {
  selectedPetId?: number | null;
  onChangePetId?: (id: number | null) => void;
}) {
  const searchParams = useSearchParams();
  const preselectId = searchParams.get('id');

  const [options, setOptions] = React.useState<OptionType[]>([]);
  const [value, setValue] = React.useState<OptionType | null>(null);

  const [animal, setAnimal] = React.useState<AnimalView | null>(null);
  const [imagens, setImagens] = React.useState<string[]>([]);
  const [indiceAtivo, setIndiceAtivo] = React.useState<number>(0);

  const [openDoenca, setOpenDoenca] = React.useState(false);
  const [openAdocao, setOpenAdocao] = React.useState(false);
  const [openVacina, setOpenVacina] = React.useState(false);
  const [itemsDoenca, setItemsDoenca] = React.useState<TimelineItem[]>([]);
  const [itemsAdocao, setItemsAdocao] = React.useState<TimelineItem[]>([]);
  const [itemsVacina, setItemsVacina] = React.useState<TimelineItem[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const lista = await listarPets({ status: 1 });
        const opts = (lista || []).map((p) => ({ id: p.id_pet || 0, title: p.tb_pet_nome }));
        setOptions(opts);
      } catch (_) {
        setOptions([]);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!preselectId) return;
    const idNum = Number(preselectId);
    if (!Number.isFinite(idNum)) return;
    const opt = options.find((o) => o.id === idNum);
    if (opt) {
      setValue(opt);
    }
    carregarAnimalEImagens(idNum);
    onChangePetId && onChangePetId(idNum);
  }, [preselectId, options?.length]);

  React.useEffect(() => {
    if (selectedPetId && options.length > 0) {
      const opt = options.find((o) => o.id === selectedPetId) || null;
      setValue(opt);
      if (opt) carregarAnimalEImagens(opt.id);
    }
  }, [selectedPetId, options]);

  async function carregarAnimalEImagens(idPet: number) {
    try {
      const pet = await retornarPet(Number(idPet));
      if (!pet) {
        setAnimal(null);
        setImagens(['/images/patas.png']);
        setIndiceAtivo(0);
        return;
      }
      const especie = pet.Especie === 1 ? 'cachorro' : 'gato';
      const sexo = pet.Genero === 1 ? 'macho' : 'femea';
      const idade = pet.DataNascimento ? `${calcularIdade(pet.DataNascimento)} anos` : '';
      setAnimal({
        id: pet.id || 0,
        nome: pet.Nome,
        especie,
        sexo,
        raca: pet.Id_Raca,
        porte: '',
        idade,
        descricao: 'Animal disponível para adoção.',
        tags: [pet.Vacinado ? 'Vacinado' : ''].filter(Boolean),
      });
      try {
        const fotos = await retornarFotosPorPet(Number(idPet));
        setImagens(fotos && fotos.length > 0 ? fotos : ['/images/patas.png']);
        setIndiceAtivo(0);
      } catch (_) {
        setImagens(['/images/patas.png']);
        setIndiceAtivo(0);
      }
    } catch (_) {
      setAnimal(null);
      setImagens(['/images/patas.png']);
      setIndiceAtivo(0);
    }
  }

  function handleChangeOption(opt: OptionType | null) {
    setValue(opt);
    if (opt && opt.id) {
      carregarAnimalEImagens(opt.id);
      onChangePetId && onChangePetId(opt.id);
    } else {
      setAnimal(null);
      setImagens([]);
      onChangePetId && onChangePetId(null);
    }
  }

  function abrirHistoricoDoenca() {
    setItemsDoenca([]);
    setOpenDoenca(true);
  }
  function abrirHistoricoAdocao() {
    setItemsAdocao([]);
    setOpenAdocao(true);
  }
  function abrirHistoricoVacina() {
    setItemsVacina([]);
    setOpenVacina(true);
  }

  const imagemAtiva = imagens[indiceAtivo] || '/images/patas.png';

  return (
    <Box sx={{ backgroundColor: '#E5E5E5', padding: 3, borderRadius: 2, maxWidth: 960, margin: '0 auto' }}>
      <Box sx={{ mb: 2 }}>
        <ComboBox
          options={options}
          value={value}
          label="Selecione o pet"
          setValue={handleChangeOption}
        />
      </Box>

      {animal && (
        <Box className="flex w-full mx-auto items-center justify-center" sx={{ mt: 2 }}>
          <Card className="flex flex-col md:flex-row gap-10 py-10 px-6 w-[960px] mx-auto">
            <div className="md:w-1/2">
              <img src={imagemAtiva} alt={animal.nome} className="rounded-xl w-full h-80 object-cover" />
              <div className="flex gap-2 mt-4 justify-center">
                {imagens.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`thumb-${idx}`}
                    className={`w-16 h-16 rounded-lg cursor-pointer ${idx === indiceAtivo ? 'ring-2 ring-purple-500' : ''}`}
                    onClick={() => setIndiceAtivo(idx)}
                  />
                ))}
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col gap-4">
              <Typography variant="h4" color="primary" fontWeight="bold">
                {animal.nome}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {animal.especie} | {animal.sexo === 'macho' ? 'Macho' : 'Fêmea'} | {animal.idade} | {animal.porte}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                Descrição
              </Typography>
              <Typography variant="body2" color="textSecondary">
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

              <div className="flex gap-2 mt-2 items-center">
                <IconButton color="secondary" onClick={abrirHistoricoDoenca} aria-label="Histórico de doenças" title="Histórico de doenças">
                  <CoronavirusIcon />
                </IconButton>
                <IconButton color="secondary" onClick={abrirHistoricoAdocao} aria-label="Histórico de adoção" title="Histórico de adoção">
                  <VolunteerActivismIcon />
                </IconButton>
                <IconButton color="secondary" onClick={abrirHistoricoVacina} aria-label="Histórico de vacinação" title="Histórico de vacinação">
                  <VaccinesIcon />
                </IconButton>
              </div>
            </div>
          </Card>

          <TimelineDialog open={openDoenca} onClose={() => setOpenDoenca(false)} title="Histórico de Doenças" items={itemsDoenca} />
          <TimelineDialog open={openAdocao} onClose={() => setOpenAdocao(false)} title="Histórico de Adoção" items={itemsAdocao} />
          <TimelineDialog open={openVacina} onClose={() => setOpenVacina(false)} title="Historico de Vacinacao" items={itemsVacina} />
        </Box>
      )}
    </Box>
  );
}

