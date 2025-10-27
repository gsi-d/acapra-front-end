"use client";
import React, { useEffect, useState } from "react";
import ComboBox from "@/app/components/ComboBox";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { enumEspecie, especiesArray, Raca } from "@/types";
import { useContextoMock } from "@/contextos/ContextoMock";
import { useRouter } from "next/navigation";
import { criarRaca } from "@/services/entities";

export default function CadastroRaca() {
  const [racaEdicao, setRacaEdicao] = useState<Raca | undefined>(undefined);
  const { racas, setRacas, openAlerta } = useContextoMock();
  const router = useRouter();

  const schema = yup.object().shape({
    id: yup.number(),
    Nome: yup.string().required("Nome é obrigatório"),
    Especie: yup.mixed<enumEspecie>().required("Espécie é obrigatória"),
  });

  const valoresIniciais = {
    id: 0,
    Nome: "",
    Especie: enumEspecie.CACHORRO,
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

  async function handleSubmitRaca(data: any) {
    try {
      await criarRaca({ Nome: data.Nome, Especie: data.Especie });
      const novoId = racas.length + 1;
      setRacas([...racas, { id: novoId, Nome: data.Nome, Especie: data.Especie }]);
      reset();
      openAlerta({ mensagem: "Raça gravada com sucesso.", severity: "success" });
      router.push("/geral/catalogo");
    } catch (e: any) {
      openAlerta({ mensagem: e?.message || "Erro ao gravar raça", severity: "error" });
    }
  }

  function onSubmit(data: any) {
    if (data) {
      const novoId = racas.length + 1;
      const novaRaca: Raca = {
        id: novoId,
        Nome: data.Nome,
        Especie: data.Especie,
      };
      const racasAtualizadas: Raca[] = [...racas, novaRaca];
      setRacas(racasAtualizadas);
      reset();
      openAlerta({
        mensagem:
          "Raça gravada com sucesso. Você pode verificar o registro no console do navegador",
        severity: "success",
      });
      router.push("/geral/catalogo");
    } else {
      openAlerta({ mensagem: "Erro ao gravar raça", severity: "error" });
    }
  }

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitRaca)}
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
    </form>
  );
}

