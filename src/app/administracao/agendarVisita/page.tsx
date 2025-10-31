"use client";
import React, { useEffect, useState } from "react";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Visita
} from "@/types";
import Alerta, { AlertaParams } from "@/app/components/Alerta";
import ComboBox, { OptionType } from "@/app/components/ComboBox";
import { useRouter } from "next/navigation";
import { criarVisita } from "@/services/entities";

export default function CadastroRaca() {
  const [alertaOpen, setAlertaOpen] = useState<boolean>(false);
  const [petsArray, setPetsArray] = useState<OptionType[]>([]);
  const [usuariosArrayApi, setUsuariosArrayApi] = useState<OptionType[]>([]);
  const [visitaEdicao, setVisitaEdicao] = useState<Visita | undefined>(undefined);
  const router = useRouter();
  const [alertaProps, setAlertaProps] = useState<AlertaParams>({
    mensagem: "",
    severity: "info",
  });

  const schema = yup.object().shape({
    id: yup.number(),
    Id_Usuario: yup.number().required("Usuário é obrigatório"),
    Id_Pet: yup.number().required("Pet é obrigatório"),
    Data: yup.string().required("Data é obrigatória"),
    Observacoes: yup.string(),
  });

  const valoresIniciais = {
    id: 0,
    Id_Usuario: 0,
    Id_Pet: 0,
    Data: "",
    Observacoes: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: valoresIniciais,
    values:
      visitaEdicao !== undefined
        ? {
            id: visitaEdicao.id,
            Id_Usuario: visitaEdicao.Id_Usuario,
            Id_Pet: visitaEdicao.Id_Pet,
            Data: visitaEdicao.Data,
            Observacoes: visitaEdicao.Observacoes,
          }
        : valoresIniciais,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  async function handleSubmitVisita(data: any) {
    try {
      await criarVisita({ Id_Usuario: data.Id_Usuario, Id_Pet: data.Id_Pet, Data: data.Data, Observacoes: data.Observacoes });
      reset();
      openAlerta({ mensagem: "Visita agendada com sucesso.", severity: "success" });
      router.push("/geral/catalogo");
    } catch (e: any) {
      openAlerta({ mensagem: e?.message || "Erro ao agendar visita", severity: "error" });
    }
  }

  useEffect(() => {
    trigger();
  }, [trigger]);

  function openAlerta(params: AlertaParams) {
    setAlertaOpen(true);
    setAlertaProps(params);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitVisita)}
      className="flex items-center justify-center bg-gray-100"
      style={{ height: "80vh" }}
    >
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-purple-600 mb-6 border-b border-gray-300 pb-2">
          Agendar Visita
        </h1>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="Id_Usuario"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <ComboBox
                  label="Usuário"
                  value={usuariosArrayApi.find((e) => e.id === value) || null}
                  setValue={(option) => onChange(option?.id || "")}
                  options={usuariosArrayApi}
                  error={Boolean(errors.Id_Usuario)}
                />
              )}
            />
          {errors.Id_Usuario && (
            <FormHelperText sx={{ color: "red", mt: "4px" }}>
              {errors.Id_Usuario.message}
            </FormHelperText>
          )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="Id_Pet"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <ComboBox
                  label="Pet"
                  value={petsArray.find((e) => e.id === value) || null}
                  setValue={(option) => onChange(option?.id || "")}
                  options={petsArray}
                  error={Boolean(errors.Id_Pet)}
                />
              )}
            />
          {errors.Id_Pet && (
            <FormHelperText sx={{ color: "red", mt: "4px" }}>
              {errors.Id_Pet.message}
            </FormHelperText>
          )}
          </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="Data"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  label={"Data"}
                  value={value ? dayjs(value) : null}
                  onChange={(newValue) => onChange(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                  slotProps={{ textField: { sx: { backgroundColor: "white" }, error: Boolean(errors.Data) } }}
                />
              )}
            />
          </LocalizationProvider>
          {errors.Data && (
            <FormHelperText sx={{ color: "red" }}>
              {errors.Data.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="Observacoes"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    multiline
                    rows={4}
                    disabled={false}
                    label={"Observações"}
                    value={value}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.Observacoes)}
                  />
                )}
              />
              {errors.Observacoes && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.Observacoes.message}
                </FormHelperText>
              )}
            </FormControl>
        <div className="flex justify-end">
          <Button
            disabled={!isValid}
            sx={{ background: "#7C3AED" }}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </div>
      <Alerta
        open={alertaOpen}
        params={alertaProps}
        setAlertaOpen={setAlertaOpen}
      />
    </form>
  );
}




