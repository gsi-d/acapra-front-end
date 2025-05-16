"use client";

import {
  especiesArray,
} from "@/types";
import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

import FormCadastroBase from "@/app/components/FormCadastroBase";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import ComboBox from "@/app/components/ComboBox";
import { useEffect } from "react";
import { AlertaParams } from "@/app/components/Alerta";

export interface PopupAtualizarInfosPet {
  togglePopup: boolean;
  setTogglePopup: (params: boolean) => void;
  idPet: number;
  openAlerta(params: AlertaParams): void;
}
export default function PopupAtualizarInfosPet(props: PopupAtualizarInfosPet) {
  const { togglePopup, setTogglePopup, idPet, openAlerta } = props;

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
  }, [trigger]);

  function handleClickSalvar() {
    reset();
    setTogglePopup(false);
  }

  function onSubmit(data: any) {
      console.log(data);
      if (data) {
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
        onSubmit={handleClickSalvar}
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 0 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="Doenca"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <ComboBox
                  label={"Doenca"}
                  value={especiesArray.find((e) => e.id === value) || null}
                  setValue={(option) => onChange(option?.id || "")}
                  options={especiesArray}
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
                  <TextField
                    disabled={false}
                    label={"Data do diagnóstico"}
                    value={value}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.DataDiagnostico)}
                  />
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
