"use client";

import { OptionType } from "@/app/components/ComboBox";
import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

import FormCadastroBase from "@/app/components/FormCadastroBase";
import { criarHistoricoVacina } from "@/services/entities";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import ComboBox from "@/app/components/ComboBox";
import { useEffect, useState } from "react";
import { AlertaParams } from "@/app/components/Alerta";
import { listarVacinas } from "@/services/entities";

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
    defaultValues: valoresIniciaisVacinacao,
    mode: "onChange",
    resolver: yupResolver(schemaVacinacao),
  });

  useEffect(() => {
    trigger();
    listarVacinas()
      .then((res) => {
        const opts = (res || []).map((v: any) => ({ id: v.id_vacina, title: v.tb_vacina_nome })) as OptionType[];
        setVacinasOptions(opts);
      })
      .catch(() => setVacinasOptions([]));
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
        titulo="Registrar Vacinação"
        open={togglePopup}
        setOpen={setTogglePopup}
        onSubmit={() => handleSubmit(onSubmit)()}
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
                  value={vacinasOptions.find((e) => e.id === Number(value)) || null}
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
                  <TextField
                    disabled={false}
                    label={"Data da aplicação"}
                    value={value}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.DataAplicacao)}
                  />
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
                  <TextField
                    disabled={false}
                    label={"Data da próxima aplicação"}
                    value={value}
                    onChange={onChange}
                    sx={{ backgroundColor: "white" }}
                    error={Boolean(errors.DataProximaAplicacao)}
                  />
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


