"use client";

import { OptionType } from "@/app/components/ComboBox";
import { Box, FormControl, FormHelperText, TextField } from "@mui/material";

import FormCadastroBase from "@/app/components/FormCadastroBase";
import { criarHistoricoDoenca } from "@/services/entities";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import ComboBox from "@/app/components/ComboBox";
import { useEffect, useState } from "react";
import { AlertaParams } from "@/app/components/Alerta";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { listarDoencas } from "@/services/entities";

export interface PopupAtualizarInfosPet {
  togglePopup: boolean;
  setTogglePopup: (params: boolean) => void;
  idPet: number;
  openAlerta(params: AlertaParams): void;
}
export default function PopupAtualizarInfosPet(props: PopupAtualizarInfosPet) {
  const { togglePopup, setTogglePopup, idPet, openAlerta } = props;
  const [doencasOptions, setDoencasOptions] = useState<OptionType[]>([]);

  const schemaDoenca = yup.object().shape({
    id: yup.number(),
    Doenca: yup.string().required("Vacina é obrigatória"),
    DataDiagnostico: yup.string().required("Data do diagnóstico é obrigatória"),
    Status: yup.string().required("Status é obrigatório"),
  });

  const valoresIniciaisDoenca = {
    id: 0,
    Doenca: "",
    DataDiagnostico: "",
    Status: "",
  };

  const {
    reset,
    control,
    trigger,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: valoresIniciaisDoenca,
    mode: "onChange",
    resolver: yupResolver(schemaDoenca),
  });

  useEffect(() => {
    trigger();
    listarDoencas()
      .then((res) => {
        const opts = (res || []).map((d: any) => ({
          id: d.id_doenca,
          title: d.tb_doenca_nome,
        })) as OptionType[];
        setDoencasOptions(opts);
      })
      .catch(() => setDoencasOptions([]));
  }, [trigger]);

  async function onSubmitDoenca(data: any) {
    try {
      const dataDiagnostico = data?.DataDiagnostico
        ? String(data.DataDiagnostico)
        : null;
      await criarHistoricoDoenca({
        id_pet: Number(idPet),
        id_doenca: Number(data.Doenca),
        dataDiagnostico,
        status: String(data.Status),
      });
      reset();
      setTogglePopup(false);
      openAlerta({
        mensagem: "Doença registrada com sucesso.",
        severity: "success",
      });
    } catch (e: any) {
      openAlerta({
        mensagem: e?.message || "Erro ao registrar doença",
        severity: "error",
      });
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormCadastroBase
        titulo="Registrar Doença"
        open={togglePopup}
        setOpen={setTogglePopup}
        onSubmit={() => handleSubmit(onSubmitDoenca)()}
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 0 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="Doenca"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <ComboBox
                  label={"Doença"}
                  value={
                    doencasOptions.find((e) => e.id === Number(value)) || null
                  }
                  setValue={(option) => onChange(option?.id || "")}
                  options={doencasOptions}
                  error={Boolean(errors.Doenca)}
                />
              )}
            />
            {errors.Doenca && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.Doenca.message}
              </FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="DataDiagnostico"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={"Data do diagnóstico"}
                      value={value ? dayjs(value) : null}
                      onChange={(newValue) =>
                        onChange(
                          newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                        )
                      }
                      slotProps={{
                        textField: {
                          sx: { backgroundColor: "white" },
                          error: Boolean(errors.DataDiagnostico),
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.DataDiagnostico && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.DataDiagnostico.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="Status"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled={false}
                    label={"Status"}
                    value={value}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.Status)}
                  />
                )}
              />
              {errors.Status && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.Status.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      </FormCadastroBase>
    </Box>
  );
}
