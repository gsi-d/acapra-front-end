"use client";
import {
  especiesArray,
  generosArray,
  Pet,
  rowsPet,
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
import ComboBox from "@/app/components/ComboBox";
import CheckBox from "@/app/components/CheckBox";
import Alerta, { AlertaParams } from "@/app/components/Alerta";
import { useRouter, useSearchParams } from "next/navigation";

export default function CadastroPet() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); 
  console.log('id',id);
  const [petEdicao, setPetEdicao] = useState<Pet | undefined>(id !== null ? rowsPet.filter((pet) => pet.id === Number(id))[0] : undefined);
  const [alertaProps, setAlertaProps] = useState<AlertaParams>({
    mensagem: "",
    severity: "info",
  });
  const [alertaOpen, setAlertaOpen] = useState<boolean>(false);
  const router = useRouter();

  const schema = yup.object().shape({
    id: yup.number(),
    Nome: yup.string().required("Nome é obrigatório"),
    Especie: yup.string().required("Espécie é obrigatória"),
    Raca: yup.string().required("Raça é obrigatória"),
    Genero: yup.string().required("Gênero é obrigatório"),
    Status: yup.string().required("Status é obrigatório"),
    Peso: yup.number().required("Peso é obrigatório"),
    DataNascimento: yup.string().required("Data de nascimento é obrigatória"),
    Adotado: yup.boolean().required(),
    DataAdocao: yup.string(),
    TutorResponsavel: yup.string(),
    Vacinado: yup.boolean().required(),
    DataUltimaVacina: yup.string(),
    Resgatado: yup.boolean().required(),
    DataResgate: yup.string(),
    LocalResgate: yup.string(),
  });

  const valoresIniciais = {
    id: 0,
    Nome: "",
    Especie: "",
    Raca: "",
    Genero: "",
    Status: "",
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
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: valoresIniciais,
    values:
      petEdicao !== undefined
        ? {
            id: petEdicao.id,
            Nome: petEdicao.Nome,
            Especie: petEdicao.Especie,
            Raca: petEdicao.Raca,
            Genero: petEdicao.Genero,
            Status: petEdicao.Status,
            Peso: petEdicao.Peso,
            Adotado: petEdicao.Adotado,
            DataAdocao: petEdicao.DataAdocao,
            TutorResponsavel: petEdicao.TutorResponsavel,
            Vacinado: petEdicao.Vacinado,
            DataUltimaVacina: petEdicao.DataUltimaVacina,
            Resgatado: petEdicao.Resgatado,
            DataResgate: petEdicao.DataResgate,
            LocalResgate: petEdicao.LocalResgate,
            DataNascimento: petEdicao.DataNascimento,
          }
        : valoresIniciais,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  function handleClose() {}

  function handleRegistrarDoencaClick(){

  }

  function handleRegistrarVacinaClick(){
    
  }

  function handleAgendarVisitaClick(){
    router.push("/geral/agendarVisita");
  }

  useEffect(() => {
    trigger();
  }, [trigger]);

  function onSubmit(data: any) {
    console.log(data);
    if (data) {
      rowsPet.push(data);
      console.log(rowsPet);
      reset();
      openAlerta({
        mensagem:
          "Pet gravado com sucesso. Você pode verificar o registro no console do navegador",
        severity: "success",
      });
    } else {
      openAlerta({ mensagem: "Erro ao gravar pet", severity: "error" });
    }
  }

  function openAlerta(params: AlertaParams) {
    setAlertaOpen(true);
    setAlertaProps(params);
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
            sx={{ color: " #7C3AED" }}
            variant="h6"
            color="secondary"
            fontWeight={600}
            fontSize={30}
            component="div"
          >
            Cadastro de Pets
          </Typography>
          <Divider sx={{ my: 2, backgroundColor: "white", height: "2px" }} />
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
                  onChange={onChange}
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
                  setValue={(option) => onChange(option?.id || "")}
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
              name="Raca"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={false}
                  label={"Raça"}
                  value={value}
                  onChange={onChange}
                  sx={{ backgroundColor: "white" }}
                  error={Boolean(errors.Raca)}
                />
              )}
            />
            {errors.Raca && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.Raca.message}
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
                  setValue={(option) => onChange(option?.id || "")}
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
              name="Status"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <ComboBox
                  label={"Status"}
                  value={statusArray.find((e) => e.id === value) || null}
                  setValue={(option) => onChange(option?.id || "")}
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
              {errors.DataAdocao && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.DataAdocao.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="DataAdocao"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={false}
                    label={"Data de Adoção"}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.DataAdocao)}
                  />
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
              {errors.DataAdocao && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.DataAdocao.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="DataUltimaVacina"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={false}
                    label={"Data da última vacina"}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.DataUltimaVacina)}
                  />
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
              {errors.DataAdocao && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.DataAdocao.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="DataResgate"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={false}
                    label={"Data do Resgate"}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.DataResgate)}
                  />
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
                  <TextField
                    disabled={false}
                    label={"Local do Resgate"}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.LocalResgate)}
                  />
                )}
              />
              {errors.LocalResgate && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.LocalResgate.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
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

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 5 }}
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
        <Alerta
          open={alertaOpen}
          params={alertaProps}
          setAlertaOpen={setAlertaOpen}
        />
      </Box>
    </form>
  );
}
