"use client";
import React, { useEffect, useState } from "react";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  especiesArray,
  petsOptionArray,
  Raca,
  usuariosArray,
  Visita,
} from "@/types";
import Alerta, { AlertaParams } from "@/app/components/Alerta";
import Input from "@/app/components/input";
import ComboBox, { OptionType } from "@/app/components/ComboBox";

export default function CadastroRaca() {
  const [visitaEdicao, setVisitaEdicao] = useState<Visita | undefined>(
    undefined
  );
  const [alertaProps, setAlertaProps] = useState<AlertaParams>({
    mensagem: "",
    severity: "info",
  });

  const [alertaOpen, setAlertaOpen] = useState<boolean>(false);

  const schema = yup.object().shape({
    id: yup.number(),
    Id_Usuario: yup.string().required("Usuário é obrigatório"),
    Id_Pet: yup.string().required("Pet é obrigatório"),
    Data: yup.string().required("Data é obrigatória"),
    Observacoes: yup.string(),
  });

  const valoresIniciais = {
    id: 0,
    Id_Usuario: "",
    Id_Pet: "",
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
                  value={usuariosArray.find((e) => e.id === value) || null}
                  setValue={(option) => onChange(option?.id || "")}
                  options={usuariosArray}
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
                  value={petsOptionArray.find((e) => e.id === value) || null}
                  setValue={(option) => onChange(option?.id || "")}
                  options={petsOptionArray}
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
          <Controller
            name="Data"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                disabled={false}
                label={"Data"}
                onChange={onChange}
                sx={{ backgroundColor: "white" }}
                error={Boolean(errors.Data)}
              />
            )}
          />
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
