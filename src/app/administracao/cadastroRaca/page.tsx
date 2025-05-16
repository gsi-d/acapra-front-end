"use client";
import React, { useEffect, useState } from "react";
import ComboBox from "@/app/components/ComboBox";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { especiesArray, Raca } from "@/types";
import Alerta, { AlertaParams } from "@/app/components/Alerta";

export default function CadastroRaca() {
  const [racaEdicao, setRacaEdicao] = useState<Raca | undefined>(undefined);
  const [alertaProps, setAlertaProps] = useState<AlertaParams>({
    mensagem: "",
    severity: "info",
  });
  const [alertaOpen, setAlertaOpen] = useState<boolean>(false);

  const schema = yup.object().shape({
    id: yup.number(),
    Nome: yup.string().required("Nome é obrigatório"),
    Especie: yup.string().required("Espécie é obrigatória"),
  });

  const valoresIniciais = {
    id: 0,
    Nome: "",
    Especie: "",
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
      racaEdicao !== undefined
        ? {
            id: racaEdicao.id,
            Nome: racaEdicao.Nome,
            Especie: racaEdicao.Especie,
          }
        : valoresIniciais,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  function onSubmit(data: any) {
    if (data) {
      console.log(data);
      reset();
      openAlerta({
        mensagem:
          "Raça gravada com sucesso. Você pode verificar o registro no console do navegador",
        severity: "success",
      });
    } else {
      openAlerta({ mensagem: "Erro ao gravar raça", severity: "error" });
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
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex items-center justify-center bg-gray-100"
      style={{ height: "80vh" }}
    >
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-purple-600 mb-6 border-b border-gray-300 pb-2">
          Adicionar Raça
        </h1>

        <FormControl fullWidth sx={{ mb: 2 }}>
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
        <FormControl fullWidth sx={{ mb: 2 }}>
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
        <div className="flex justify-end mt-4">
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
