"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography, Chip, Button, Card, IconButton } from "@mui/material";
import { retornarPet, retornarFotosPorPet } from "@/services/pets";
import { calcularIdade } from "@/app/util/DataHelper";
import TimelineDialog, { TimelineItem } from "@/app/components/TimelineDialog";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import dayjs from "dayjs";
import {
  listarHistoricoAdocaoPorPet,
  listarHistoricoDoencaPorPet,
  listarHistoricoVacinaPorPet,
} from "@/services/entities";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [animal, setAnimal] = useState<any | null>(null);
  const [imagens, setImagens] = useState<string[]>([]);
  const [indiceAtivo, setIndiceAtivo] = useState<number>(0);
  const [openDoenca, setOpenDoenca] = useState(false);
  const [openAdocao, setOpenAdocao] = useState(false);
  const [openVacina, setOpenVacina] = useState(false);
  const [itemsDoenca, setItemsDoenca] = useState<TimelineItem[]>([]);
  const [itemsAdocao, setItemsAdocao] = useState<TimelineItem[]>([]);
  const [itemsVacina, setItemsVacina] = useState<TimelineItem[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const pet = await retornarPet(Number(id));
        if (!pet) {
          setAnimal(null);
          return;
        }
        const especie = pet.Especie === 1 ? "cachorro" : "gato";
        const sexo = pet.Genero === 1 ? "macho" : "femea";
        const idade = pet.DataNascimento
          ? `${calcularIdade(pet.DataNascimento)} anos`
          : "";
        setAnimal({
          id: pet.id,
          nome: pet.Nome,
          especie,
          sexo,
          raca: pet.Id_Raca,
          porte: "",
          idade,
          imagem: "https://placedog.net/500?id=" + (pet.id ?? 1),
          descricao: "Animal disponível para adoção.",
          tags: [pet.Vacinado ? "Vacinado" : ""].filter(Boolean),
        });
        try {
          const fotos = await retornarFotosPorPet(Number(id));
          setImagens(fotos && fotos.length > 0 ? fotos : ["/images/patas.png"]);
          setIndiceAtivo(0);
        } catch {
          setImagens(["/images/patas.png"]);
          setIndiceAtivo(0);
        }
      } catch (e) {
        setAnimal(null);
      }
    };
    load();
  }, [id]);

  function handleClickQueroAdotar() {
    router.push(`/geral/adocao?id=${animal?.id}`);
  }

  async function abrirHistoricoDoenca() {
    if (!animal?.id) return;
    try {
      const lista = await listarHistoricoDoencaPorPet(Number(animal.id));
      const items: TimelineItem[] = (lista || [])
        .map((r: any) => {
          const dataRaw =
            r.tb_historico_doenca_data_diagnostico ||
            r.data ||
            r.dataDiagnostico ||
            r.created_at;
          const dataFmt = dataRaw
            ? dayjs(dataRaw).format("DD/MM/YYYY")
            : undefined;
          const status = r.tb_historico_doenca_status || r.status || "";
          const nome = (r as any).tb_doenca_nome || "";
          return {
            date: dataFmt ?? null,
            title: nome
              ? `Doenca: ${nome}`
              : status
              ? `Status: ${status}`
              : "Doenca",
            subtitle: status ? `Status: ${status}` : null,
          } as TimelineItem;
        })
        .sort((a: TimelineItem, b: TimelineItem) => {
          const da = a.date
            ? dayjs(a.date, "DD/MM/YYYY").toDate().getTime()
            : 0;
          const db = b.date
            ? dayjs(b.date, "DD/MM/YYYY").toDate().getTime()
            : 0;
          return db - da;
        });
      setItemsDoenca(items);
    } catch {
      setItemsDoenca([]);
    }
    setOpenDoenca(true);
  }

  async function abrirHistoricoAdocao() {
    if (!animal?.id) return;
    try {
      const lista = await listarHistoricoAdocaoPorPet(Number(animal.id));
      const items: TimelineItem[] = (lista || [])
        .map((r: any) => {
          const dataRaw =
            r.tb_historico_adocao_data ||
            r.data ||
            r.data_adocao ||
            r.created_at;
          const dataFmt = dataRaw
            ? dayjs(dataRaw).format("DD/MM/YYYY")
            : undefined;
          const status = r.tb_historico_adocao_status || r.status || "";
          return {
            date: dataFmt ?? null,
            title: status ? `Status: ${status}` : "Evento de adocao",
            subtitle: null,
          } as TimelineItem;
        })
        .sort((a: TimelineItem, b: TimelineItem) => {
          const da = a.date
            ? dayjs(a.date, "DD/MM/YYYY").toDate().getTime()
            : 0;
          const db = b.date
            ? dayjs(b.date, "DD/MM/YYYY").toDate().getTime()
            : 0;
          return db - da;
        });
      setItemsAdocao(items);
    } catch {
      setItemsAdocao([]);
    }
    setOpenAdocao(true);
  }

  function abrirHistoricoVacina() {
    (async () => {
      if (!animal?.id) return setOpenVacina(true);
      try {
        const lista = await listarHistoricoVacinaPorPet(Number(animal.id));
        const items: TimelineItem[] = (lista || [])
          .map((r: any) => {
            const dataRaw =
              r.tb_his_vacina_data_aplicacao ||
              r.data ||
              r.data_aplicacao ||
              r.created_at;
            const dataFmt = dataRaw
              ? dayjs(dataRaw).format("DD/MM/YYYY")
              : undefined;
            const nome = r.tb_vacina_nome || "";
            const proxRaw =
              r.tb_his_vacina_proxima_aplicacao || r.data_proxima || null;
            const proxFmt = proxRaw
              ? dayjs(proxRaw).format("DD/MM/YYYY")
              : null;
            return {
              date: dataFmt ?? null,
              title: nome ? `Vacina: ${nome}` : "Vacinacao",
              subtitle: proxFmt ? `Proxima: ${proxFmt}` : null,
            } as TimelineItem;
          })
          .sort((a: TimelineItem, b: TimelineItem) => {
            const da = a.date
              ? dayjs(a.date, "DD/MM/YYYY").toDate().getTime()
              : 0;
            const db = b.date
              ? dayjs(b.date, "DD/MM/YYYY").toDate().getTime()
              : 0;
            return db - da;
          });
        setItemsVacina(items);
      } catch {
        setItemsVacina([]);
      }
      setOpenVacina(true);
    })();
  }

  if (!animal)
    return <Typography className="p-8">Animal não encontrado.</Typography>;

  const imagemAtiva = imagens[indiceAtivo] || "/images/patas.png";

  return (
    <Box
      className="flex p-8 w-full mx-auto items-center justify-center"
      sx={{ height: "80vh" }}
    >
      <Card className="flex flex-col md:flex-row gap-10 py-10 px-6 w-[960px] h-[500px] mx-auto">
        <div className="md:w-1/2">
          <img
            src={imagemAtiva}
            alt={animal.nome}
            className="rounded-xl w-full h-80 object-cover"
          />
          <div className="flex gap-2 mt-4 justify-center">
            {imagens.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`thumb-${idx}`}
                className={`w-16 h-16 rounded-lg cursor-pointer ${
                  idx === indiceAtivo ? "ring-2 ring-purple-500" : ""
                }`}
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
            {animal.especie} | {animal.sexo === "macho" ? "Macho" : "Fêmea"} |{" "}
            {animal.idade} | {animal.porte}
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="textSecondary"
          >
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

          <Button
            variant="contained"
            color="primary"
            className="mt-4 self-start"
            onClick={handleClickQueroAdotar}
          >
            Quero Adotar
          </Button>

          <div className="flex gap-2 mt-2 items-center">
            <IconButton
              color="secondary"
              onClick={abrirHistoricoDoenca}
              aria-label="Histórico de doenças"
              title="Histórico de doenças"
            >
              <CoronavirusIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={abrirHistoricoAdocao}
              aria-label="Histórico de adoção"
              title="Histórico de adoção"
            >
              <VolunteerActivismIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={abrirHistoricoVacina}
              aria-label="Histórico de vacinação"
              title="Histórico de vacinação"
            >
              <VaccinesIcon />
            </IconButton>
          </div>
        </div>
      </Card>
      <TimelineDialog
        open={openDoenca}
        onClose={() => setOpenDoenca(false)}
        title="Histórico de Doenças"
        items={itemsDoenca}
      />
      <TimelineDialog
        open={openAdocao}
        onClose={() => setOpenAdocao(false)}
        title="Histórico de Adoção"
        items={itemsAdocao}
      />
      <TimelineDialog
        open={openVacina}
        onClose={() => setOpenVacina(false)}
        title="Historico de Vacinacao"
        items={itemsVacina}
      />
    </Box>
  );
}
