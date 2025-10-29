"use client";
import {
  enumEspecie,
  enumGenero,
  enumStatus,
  enumPorte,
  especiesArray,
  generosArray,
  Pet,
  retornaRacasOptionArray,
  statusArray,
} from "@/types";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ComboBox, { OptionType } from "@/app/components/ComboBox";
import CheckBox from "@/app/components/CheckBox";
import { useRouter, useSearchParams } from "next/navigation";
import PopUpRegistrarVacinacao from "./PopUpRegistrarVacinacao";
import PopUpRegistrarDoenca from "./PopUpRegistrarDoenca";
import { useContextoMock } from "@/contextos/ContextoMock";
import { listarRacas } from "@/services/entities";
import { criarPet, atualizarPet, retornarPet, criarPetComAnexo, atualizarPetComAnexo, retornarFotosPorPet } from "@/services/pets";
import ImageUploader from "@/app/components/ImageUploader";

export default function CadastroPet() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [togglePopupVacinacao, setTogglePopupVacinacao] =
    useState<boolean>(false);
  const [togglePopupDoenca, setTogglePopupDoenca] = useState<boolean>(false);
  const { pets, setPets, racas, setRacas, openAlerta } = useContextoMock();
  const racasArray = retornaRacasOptionArray(racas);

  type FormValues = {
    id: number;
    Nome: string;
    Especie: enumEspecie;
    Id_Raca: number;
    Porte: enumPorte;
    Genero: enumGenero;
    Status: enumStatus;
    DataNascimento: string;
    Peso: number;
    Adotado: boolean;
    DataAdocao: string;
    TutorResponsavel: string;
    Vacinado: boolean;
    DataUltimaVacina: string;
    Resgatado: boolean;
    DataResgate: string;
    LocalResgate: string;
  };

  const [petEdicao, setPetEdicao] = useState<Pet | undefined>(undefined);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const portesOptions: OptionType[] = [
    { id: enumPorte.PEQUENO, title: 'Pequeno' },
    { id: enumPorte.MEDIO, title: 'Médio' },
    { id: enumPorte.GRANDE, title: 'Grande' },
  ];

  async function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // Carrega dados do pet em modo edição a partir da API
  useEffect(() => {
    let cancelled = false;
    const carregarPet = async () => {
      const idNum = id ? Number(id) : 0;
      if (!idNum) return;
      try {
        const pet = await retornarPet(idNum);
        if (!cancelled) setPetEdicao(pet ?? undefined);
      } catch (e) {
        openAlerta({ mensagem: 'Falha ao carregar pet para edição', severity: 'error' });
      }
    };
    carregarPet();
    return () => {
      cancelled = true;
    };
  }, [id, openAlerta]);

  useEffect(() => {
    let cancelled = false;
    async function carregarRacas() {
      try {
        if (racas.length > 0) return;
        const lista = await listarRacas();
        if (cancelled) return;
        const mapeadas = (lista || []).map((row: any) => ({
          id: row.id ?? row.id_raca ?? row.idRaca ?? 0,
          Nome:
            row.Nome ?? row.nome ?? row.tb_raca_nome_raca ?? row.tb_raca_nome ?? "",
          Especie:
            row.Especie ??
            (row.tb_raca_nome_especie === "Cachorro"
              ? enumEspecie.CACHORRO
              : row.tb_raca_nome_especie === "Gato"
              ? enumEspecie.GATO
              : enumEspecie.CACHORRO),
        }));
        if (mapeadas.length > 0) setRacas(mapeadas);
      } catch (e: any) {
        openAlerta({ mensagem: e?.message || "Falha ao carregar raças", severity: "error" });
      }
    }
    carregarRacas();
    return () => {
      cancelled = true;
    };
  }, [racas.length, setRacas, openAlerta]);

  useEffect(() => {
    if (petEdicao) {
      const url = (petEdicao as any)?.tb_pet_foto_url
        ?? (petEdicao as any)?.tb_pet_foto
        ?? (petEdicao as any)?.fotoUrl
        ?? (petEdicao as any)?.foto
        ?? null;
      setFotoPreview(url);
    } else {
      setFotoPreview(null);
      setFotoFile(null);
    }
  }, [petEdicao]);

  useEffect(() => {
    let cancelled = false;
    async function carregarFotos() {
      const idNum = petEdicao?.id;
      if (!idNum) return;
      try {
        const urls = await retornarFotosPorPet(idNum);
        if (cancelled) return;
        if (urls && urls.length > 0) setFotoPreview(urls[0]);
      } catch {
      }
    }
    carregarFotos();
    return () => { cancelled = true; };
  }, [petEdicao?.id]);

  const schema = yup.object().shape({
    id: yup.number(),
    Nome: yup.string().required("Nome é obrigatório"),
    Especie: yup.mixed<enumEspecie>().required("Espécie é obrigatória"),
    Id_Raca: yup.number().required("Raça é obrigatória"),
    Genero: yup.mixed<enumGenero>().required("Gênero é obrigatório"),
    Status: yup.mixed<enumStatus>().required("Status é obrigatório"),
    Peso: yup.number().required("Peso é obrigatório"),
    DataNascimento: yup.string().required("Data de nascimento é obrigatória"),
    Adotado: yup.boolean(),
    DataAdocao: yup
      .string()
      .when([], {
        is: () => adotado,
        then: schema => schema.required("Data de adoção é obrigatória"),
        otherwise: schema => schema.notRequired()
      }),
    TutorResponsavel: yup
      .string()
      .when([], {
        is: () => adotado,
        then: schema => schema.required("Tutor responsável é obrigatório"),
        otherwise: schema => schema.notRequired()
      }),
    Vacinado: yup.boolean(),
    DataUltimaVacina: yup
      .string()
      .when([], {
        is: () => vacinado,
        then: schema => schema.required("Data da última vacina é obrigatória"),
        otherwise: schema => schema.notRequired()
      }),
    Resgatado: yup.boolean(),
    DataResgate: yup
      .string()
      .when([], {
        is: () => resgatado,
        then: schema => schema.required("Data de resgate é obrigatória"),
        otherwise: schema => schema.notRequired()
      }),
    LocalResgate: yup
      .string()
      .when([], {
        is: () => resgatado,
        then: schema => schema.required("Local de resgate é obrigatório"),
        otherwise: schema => schema.notRequired()
      }),
  });

  const valoresIniciais: FormValues = {
    id: 0,
    Nome: "",
    Especie: enumEspecie.CACHORRO,
    Id_Raca: 0,
    Porte: enumPorte.PEQUENO,
    Genero: enumGenero.MASCULINO,
    Status: enumStatus.DISPONIVEL,
    DataNascimento: "",
    Peso: 0,
    Adotado: false,
    DataAdocao: "",
    TutorResponsavel: "",
    Vacinado: false,
    DataUltimaVacina: "",
    Resgatado: false,
    DataResgate: "",
    LocalResgate: "",
  };

  const {
    reset,
    control,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: valoresIniciais,
    values:
      petEdicao !== undefined
        ? {
            id: petEdicao.id ?? 0,
            Nome: petEdicao.Nome,
            Especie: petEdicao.Especie,
            Id_Raca: petEdicao.Id_Raca,
            Porte: (petEdicao as any).Porte ?? (petEdicao as any).tb_pet_porte ?? enumPorte.PEQUENO,
            Genero: petEdicao.Genero,
            Status: petEdicao.Status,
            Peso: petEdicao.Peso,
            Adotado: petEdicao.Adotado,
            DataAdocao: petEdicao.DataAdocao || "",
            TutorResponsavel: petEdicao.TutorResponsavel || "",
            Vacinado: petEdicao.Vacinado,
            DataUltimaVacina: petEdicao.DataUltimaVacina || "",
            Resgatado: petEdicao.Resgatado,
            DataResgate: petEdicao.DataResgate || "",
            LocalResgate: petEdicao.LocalResgate || "",
            DataNascimento: petEdicao.DataNascimento || "",
          }
        : valoresIniciais,
    mode: "onChange",
    resolver: yupResolver(schema) as any,
  });

  const adotado = watch("Adotado");
  const vacinado = watch("Vacinado");
  const resgatado = watch("Resgatado");

  // Quando o pet de edição é carregado da API, reseta o formulário com os dados
  useEffect(() => {
    if (!petEdicao) return;
    reset({
      id: petEdicao.id || 0,
      Nome: petEdicao.Nome,
      Especie: petEdicao.Especie,
      Id_Raca: petEdicao.Id_Raca,
      Porte: (petEdicao as Pet).Porte ?? (petEdicao as any).tb_pet_porte ?? enumPorte.PEQUENO,
      Genero: petEdicao.Genero,
      Status: petEdicao.Status,
      Peso: petEdicao.Peso,
      Adotado: petEdicao.Adotado,
      DataAdocao: petEdicao.DataAdocao || "",
      TutorResponsavel: petEdicao.TutorResponsavel || "",
      Vacinado: petEdicao.Vacinado,
      DataUltimaVacina: petEdicao.DataUltimaVacina || "",
      Resgatado: petEdicao.Resgatado,
      DataResgate: petEdicao.DataResgate || "",
      LocalResgate: petEdicao.LocalResgate || "",
      DataNascimento: petEdicao.DataNascimento || "",
    });
  }, [petEdicao, reset]);

  function handleClose() {}

  function handleRegistrarDoencaClick() {
    setTogglePopupDoenca(true);
  }

  function handleRegistrarVacinaClick() {
    setTogglePopupVacinacao(true);
  }

  function handleAgendarVisitaClick() {
    router.push("/administracao/agendarVisita");
  }

  useEffect(() => {
    trigger();
  }, [trigger, adotado, vacinado, resgatado]);

  async function onSubmit(data: FormValues) {
    try {
      const payload: Pet = {
        id: petEdicao?.id,
        Nome: data.Nome,
        Especie: data.Especie,
        Id_Raca: data.Id_Raca,
        Porte: data.Porte,
        Genero: data.Genero,
        Status: data.Status,
        Peso: data.Peso,
        Adotado: data.Adotado,
        DataAdocao: data.DataAdocao,
        TutorResponsavel: data.TutorResponsavel,
        Vacinado: data.Vacinado,
        DataUltimaVacina: data.DataUltimaVacina,
        Resgatado: data.Resgatado,
        DataResgate: data.DataResgate,
        LocalResgate: data.LocalResgate,
        DataNascimento: data.DataNascimento,
      };

      let anexoOpts: { anexo?: string | null; tb_foto_pet_url_foto?: string | null } | undefined;
      if (fotoFile) {
        const dataUrl = await fileToDataUrl(fotoFile);
        anexoOpts = { anexo: dataUrl };
      } else if (fotoPreview && !fotoPreview.startsWith('blob:')) {
        anexoOpts = { tb_foto_pet_url_foto: fotoPreview };
      }

      if (payload.id && payload.id > 0) {
        if (anexoOpts) {
          await atualizarPetComAnexo(payload, anexoOpts);
        } else {
          await atualizarPet(payload);
        }
        const idx = pets.findIndex((p) => p.id === payload.id);
        if (idx >= 0) {
          const clone = [...pets];
          clone[idx] = { ...clone[idx], ...payload } as Pet;
          setPets(clone);
        }
        openAlerta({ mensagem: "Pet atualizado com sucesso.", severity: "success" });
      } else {
        const novoId = anexoOpts
          ? await criarPetComAnexo(payload, anexoOpts)
          : await criarPet(payload);
        setPets([
          ...pets,
          {
            ...payload,
            id: novoId,
          },
        ]);
        openAlerta({ mensagem: "Pet criado com sucesso.", severity: "success" });
      }
      reset();
      router.push("/geral/catalogo");
      return;
    } catch (e: any) {
      openAlerta({ mensagem: e?.message || "Erro ao gravar pet", severity: "error" });
      return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 5,
          }}
        >
          <Box
            className="bg-black/10"
            sx={{
              p: 5,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              width: "50%",
              borderRadius: "0.5rem",
            }}
          >
            <Typography
              sx={{ color: "#7C3AED" }}
              variant="h6"
              color="secondary"
              fontWeight={600}
              fontSize={30}
              component="div"
            >
              Cadastro de Pets
            </Typography>
            <Divider sx={{ my: 2, backgroundColor: "white", height: "2px" }} />
            <FormControl fullWidth sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ImageUploader
                label="Foto do Pet"
                value={fotoPreview}
                onChange={(file, preview) => { setFotoFile(file); setFotoPreview(preview); }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="Nome"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={false}
                    label={"Nome"}
                    value={value}
                    onChange={(e) => onChange(Number((e as any).target?.value ?? 0))}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.Nome)}
                  />
                )}
              />
              {errors.Nome && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.Nome.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="Especie"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <ComboBox
                    label={"Especie"}
                    value={especiesArray.find((e) => e.id === value) || null}
                    setValue={(option) => onChange(option?.id ?? 0)}
                    options={especiesArray}
                    error={Boolean(errors.Especie)}
                  />
                )}
              />
              {errors.Especie && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.Especie.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="Id_Raca"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <ComboBox
                    label="Raca"
                    value={racasArray.find((e) => e.id === value) || null}
                    setValue={(option) => onChange(option?.id ?? 0)}
                    options={racasArray}
                    error={Boolean(errors.Id_Raca)}
                  />
                )}
              />
              {errors.Id_Raca && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.Id_Raca.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="Genero"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <ComboBox
                    label={"Genero"}
                    value={generosArray.find((e) => e.id === value) || null}
                    setValue={(option) => onChange(option?.id ?? 0)}
                    options={generosArray}
                    error={Boolean(errors.Especie)}
                  />
                )}
              />
              {errors.Genero && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.Genero.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="Porte"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ComboBox
                    label={"Porte"}
                    value={portesOptions.find((p) => p.id === value) || null}
                    setValue={(option) => onChange(option?.id ?? 0)}
                    options={portesOptions}
                    error={Boolean(errors.Porte)}
                  />
                )}
              />
              {errors.Porte && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.Porte.message as any}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="Status"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <ComboBox
                    label={"Status"}
                    value={statusArray.find((e) => e.id === value) || null}
                    setValue={(option) => onChange(option?.id ?? 0)}
                    options={statusArray}
                    error={Boolean(errors.Especie)}
                  />
                )}
              />
              {errors.Status && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.Status.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="Peso"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={false}
                    label={"Peso"}
                    value={value}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.Peso)}
                  />
                )}
              />
              {errors.Peso && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.Peso.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="DataNascimento"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={"Data de Nascimento"}
                      value={value ? dayjs(value) : null}
                      onChange={(newValue) => onChange(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                      slotProps={{ textField: { sx: { backgroundColor: "white" }, error: Boolean(errors.DataNascimento) } }}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.DataNascimento && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.DataNascimento.message}
                </FormHelperText>
              )}
            </FormControl>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl fullWidth sx={{ mb: 6, width: "50%" }}>
                <Controller
                  name="Adotado"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={<CheckBox value={value} onChange={onChange} />}
                      sx={{ color: "black" }}
                      label="Adotado"
                    />
                  )}
                />
                {errors.Adotado && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.Adotado.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name="DataAdocao"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                    <TextField
                      disabled={false}
                      label={"Data de Adoção"}
                      onChange={onChange}
                      sx={{ backgroundColor: "white", display: 'none' }}
                      error={Boolean(errors.DataAdocao)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={"Data de Adoção"}
                        value={value ? dayjs(value) : null}
                        onChange={(newValue) => onChange(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                        slotProps={{ textField: { sx: { backgroundColor: "white" } } }}
                      />
                    </LocalizationProvider>
                    </>
                  )}
                />
                {errors.DataAdocao && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.DataAdocao.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name="TutorResponsavel"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      disabled={false}
                      label={"Tutor Responsável"}
                      onChange={onChange}
                      sx={{ backgroundColor: "white" }}
                      error={Boolean(errors.TutorResponsavel)}
                    />
                  )}
                />
                {errors.TutorResponsavel && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.TutorResponsavel.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl fullWidth sx={{ mb: 6, width: "24%" }}>
                <Controller
                  name="Vacinado"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={<CheckBox value={value} onChange={onChange} />}
                      sx={{ color: "black" }}
                      label="Vacinado"
                    />
                  )}
                />
                {errors.Vacinado && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.Vacinado.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name="DataUltimaVacina"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                    <TextField
                      disabled={false}
                      label={"Data da última vacina"}
                      onChange={onChange}
                      sx={{ backgroundColor: "white", display: 'none' }}
                      error={Boolean(errors.DataUltimaVacina)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={"Data da última vacina"}
                        value={value ? dayjs(value) : null}
                        onChange={(newValue) => onChange(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                        slotProps={{ textField: { sx: { backgroundColor: "white" } } }}
                      />
                    </LocalizationProvider>
                    </>
                  )}
                />
                {errors.DataUltimaVacina && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.DataUltimaVacina.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl fullWidth sx={{ mb: 6, width: "50%" }}>
                <Controller
                  name="Resgatado"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={<CheckBox value={value} onChange={onChange} />}
                      sx={{ color: "black" }}
                      label="Resgatado"
                    />
                  )}
                />
                {errors.Resgatado && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.Resgatado.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name="DataResgate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={"Data do Resgate"}
                        value={value ? dayjs(value) : null}
                        onChange={(newValue) => onChange(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                        slotProps={{ textField: { sx: { backgroundColor: "white" }, error: Boolean(errors.DataResgate) } }}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors.DataResgate && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.DataResgate.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Controller
                  name="LocalResgate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                    <TextField
                      disabled={false}
                      label={"Local do Resgate"}
                      onChange={onChange}
                      sx={{ backgroundColor: "white" }}
                      error={Boolean(errors.LocalResgate)}
                    />
                    </>
                  )}
                />
                {errors.LocalResgate && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.LocalResgate.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            {petEdicao !== undefined && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  sx={{ background: "#7C3AED" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleRegistrarVacinaClick}
                >
                  Registrar Vacinação
                </Button>
                <Button
                  sx={{ background: "#7C3AED" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleRegistrarDoencaClick}
                >
                  Registrar Doença
                </Button>
                <Button
                  sx={{ background: "#7C3AED" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleAgendarVisitaClick}
                >
                  Agendar Visita
                </Button>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 5,
              }}
            >
              <Button
                sx={{ border: "1px solid #7C3AED", color: "#7C3AED" }}
                variant="outlined"
                color="secondary"
                type="button"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                disabled={!isValid}
                sx={{ background: "#7C3AED" }}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
      <PopUpRegistrarVacinacao
        setTogglePopup={setTogglePopupVacinacao}
        togglePopup={togglePopupVacinacao}
        idPet={petEdicao && petEdicao.id ? petEdicao.id : 0}
        openAlerta={openAlerta}
      />

      <PopUpRegistrarDoenca
        setTogglePopup={setTogglePopupDoenca}
        togglePopup={togglePopupDoenca}
        idPet={petEdicao && petEdicao.id ? petEdicao.id : 0}
        openAlerta={openAlerta}
      />
    </>
  );
}