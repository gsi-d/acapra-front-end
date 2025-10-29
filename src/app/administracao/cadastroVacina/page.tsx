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
import { Vacina } from "@/types";
import { useContextoMock } from "@/contextos/ContextoMock";
import { criarVacina } from "@/services/entities";
import { useRouter } from "next/navigation";

export default function CadastroVacina() {
  const [VacinaEdicao, setVacinaEdicao] = useState<Vacina | undefined>(
    undefined
  );
  const { vacinas, setVacinas, openAlerta } = useContextoMock();
  const router = useRouter();

  const schema = yup.object().shape({
    id: yup.number(),
    Nome: yup.string().required("Nome é obrigatório"),
    DataVacina: yup.string().required("Espécie é obrigatória"),
  });

  const valoresIniciais = {
    id: 0,
    Nome: "",
    DataVacina: "",
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
      VacinaEdicao !== undefined
        ? {
            id: VacinaEdicao.id,
            Nome: VacinaEdicao.Nome,
            DataVacina: VacinaEdicao.DataVacina,
          }
        : valoresIniciais,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  async function handleSubmitVacina(data: any) {
    try {
      await criarVacina({ Nome: data.Nome, DataVacina: data.DataVacina });
      const novaVacina: Vacina = {
        id: data.id,
        Nome: data.Nome,
        DataVacina: data.DataVacina,
      };
      setVacinas([...vacinas, novaVacina]);
      reset();
      openAlerta({
        mensagem: "Vacina gravada com sucesso.",
        severity: "success",
      });
      router.push("/geral/catalogo");
    } catch (e: any) {
      openAlerta({
        mensagem: e?.message || "Erro ao gravar vacina",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitVacina)}
      className="flex items-center justify-center bg-gray-100"
      style={{ height: "80vh" }}
    >
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-purple-600 mb-6 border-b border-gray-300 pb-2">
          Cadastrar Vacina
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="DataVacina"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  label={"Data para Vacina"}
                  value={value ? dayjs(value) : null}
                  onChange={(newValue) =>
                    onChange(
                      newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                    )
                  }
                  slotProps={{
                    textField: {
                      sx: { backgroundColor: "white" },
                      error: Boolean(errors.DataVacina),
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          {errors.DataVacina && (
            <FormHelperText sx={{ color: "red" }}>
              {errors.DataVacina.message}
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
    </form>
  );
}