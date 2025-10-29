"use client";

import { OptionType } from "@/app/components/ComboBox";
import { Box, FormControl, FormHelperText } from "@mui/material";

import FormCadastroBase from "@/app/components/FormCadastroBase";
import { criarHistoricoVacina } from "@/services/entities";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import ComboBox from "@/app/components/ComboBox";
import { useEffect, useState } from "react";
import { AlertaParams } from "@/app/components/Alerta";
import { listarVacinas } from "@/services/entities";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export interface PopupAtualizarInfosPet {
  togglePopup: boolean;
  setTogglePopup: (params: boolean) => void;
  idPet: number;
  openAlerta(params: AlertaParams): void;
}

export default function PopUpRegistrarVacinacao(props: PopupAtualizarInfosPet) {
  const { togglePopup, setTogglePopup, idPet, openAlerta } = props;
  const [vacinasOptions, setVacinasOptions] = useState<OptionType[]>([]);

  const schemaVacinacao = yup.object().shape({
    id: yup.number(),
    Vacina: yup.string().required("Vacina é obrigatória"),
    DataAplicacao: yup.string().required("Data de aplicação é obrigatória"),
    DataProximaAplicacao: yup
      .string()
      .required("Data da próxima aplicação é obrigatória"),
  });

  const schemaDoenca = yup.object().shape({
    id: yup.number(),
    Doenca: yup.string().required("Vacina é obrigatória"),
    DataDiagnostico: yup.string().required("Data do diagnóstico é obrigatória"),
    Status: yup.string().required("Status é obrigatório"),
  });

  const valoresIniciaisVacinacao = {
    id: 0,
    Vacina: "",
    DataAplicacao: "",
    DataProximaAplicacao: "",
  };

  const {
    reset,
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: valoresIniciaisVacinacao,
    mode: "onChange",
    resolver: yupResolver(schemaVacinacao),
  });

  useEffect(() => {
    trigger();
    listarVacinas()
      .then((res) => {
        const opts = (res || []).map((v: any) => ({
          id: v.id_vacina,
          title: v.tb_vacina_nome,
        })) as OptionType[];
        setVacinasOptions(opts);
      })
      .catch(() => setVacinasOptions([]));
  }, [trigger]);

  async function onSubmitVacina(data: any) {
    try {
      const dataAplicacao = data?.DataAplicacao
        ? String(data.DataAplicacao)
        : null;
      const dataProximaAplicacao = data?.DataProximaAplicacao
        ? String(data.DataProximaAplicacao)
        : null;
      await criarHistoricoVacina({
        id_pet: Number(idPet),
        id_vacina: Number(data.Vacina),
        dataAplicacao,
        dataProximaAplicacao,
      });
      reset();
      setTogglePopup(false);
      openAlerta({
        mensagem: "Vacinação registrada com sucesso.",
        severity: "success",
      });
    } catch (e: any) {
      openAlerta({
        mensagem: e?.message || "Erro ao registrar vacinação",
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
        titulo="Registrar Vacinação"
        open={togglePopup}
        setOpen={setTogglePopup}
        onSubmit={() => handleSubmit(onSubmitVacina)()}
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 0 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="Vacina"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <ComboBox
                  label={"Vacina"}
                  value={
                    vacinasOptions.find((e) => e.id === Number(value)) || null
                  }
                  setValue={(option) => onChange(option?.id || "")}
                  options={vacinasOptions}
                  error={Boolean(errors.Vacina)}
                />
              )}
            />
            {errors.Vacina && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.Vacina.message}
              </FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="DataAplicacao"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={"Data da aplicação"}
                      value={value ? dayjs(value) : null}
                      onChange={(newValue) =>
                        onChange(
                          newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                        )
                      }
                      slotProps={{
                        textField: {
                          sx: { backgroundColor: "white" },
                          error: Boolean(errors.DataAplicacao),
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.DataAplicacao && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.DataAplicacao.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="DataProximaAplicacao"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={"Data da próxima aplicação"}
                      value={value ? dayjs(value) : null}
                      onChange={(newValue) =>
                        onChange(
                          newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                        )
                      }
                      slotProps={{
                        textField: {
                          sx: { backgroundColor: "white" },
                          error: Boolean(errors.DataProximaAplicacao),
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.DataProximaAplicacao && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.DataProximaAplicacao.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      </FormCadastroBase>
    </Box>
  );
}
