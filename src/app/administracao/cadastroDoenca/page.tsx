"use client";
import React, { useEffect, useState } from "react";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Doenca } from "@/types";
import Alerta, { AlertaParams } from "@/app/components/Alerta";
import { useContextoMock } from "@/contextos/ContextoMock";
import { criarDoenca } from "@/services/entities";
import { useRouter } from "next/navigation";

export default function CadastroDoenca() {
  const [alertaOpen, setAlertaOpen] = useState<boolean>(false);
  const {doencas, setDoencas, openAlerta} = useContextoMock();
  const router = useRouter();
  const [DoencaEdicao, setDoencaEdicao] = useState<Doenca | undefined>(undefined);
  const [alertaProps, setAlertaProps] = useState<AlertaParams>({
    mensagem: "",
    severity: "info",
  });

  const schema = yup.object().shape({
    id: yup.number(),
    Nome: yup.string().required("Nome é obrigatório"),
    Descricao: yup.string().required("Espécie é obrigatória"),
  });

  const valoresIniciais = {
    id: 0,
    Nome: '',
    Descricao: '',
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
      DoencaEdicao !== undefined
        ? {
            id: DoencaEdicao.id,
            Nome: DoencaEdicao.Nome,
            Descricao: DoencaEdicao.Descricao,
          }
        : valoresIniciais,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  async function handleSubmitDoenca(data: any) {
    try {
      await criarDoenca({ Nome: data.Nome, Descricao: data.Descricao });
      const novoId = doencas.length + 1;
      setDoencas([...doencas, { id: novoId, Nome: data.Nome, Descricao: data.Descricao }]);
      reset();
      openAlerta({ mensagem: "Doença gravada com sucesso.", severity: "success" });
      router.push("/geral/catalogo");
    } catch (e: any) {
      openAlerta({ mensagem: e?.message || "Erro ao gravar doença", severity: "error" });
    }
  }

  function onSubmit(data: any) {
    if (data) {
      const novoId = doencas.length + 1;
      const novaDoenca : Doenca = {
        id: novoId,
        Nome: data.Nome,
        Descricao: data.Descricao,
      };
      const doencasAtualizadas : Doenca[] = [...doencas, novaDoenca];
      setDoencas(doencasAtualizadas);
      reset();
      openAlerta({
        mensagem:
          "Doença gravada com sucesso. Você pode verificar o registro no console do navegador",
        severity: "success",
      });
      router.push("/geral/catalogo");
    } else {
      openAlerta({ mensagem: "Erro ao gravar doença", severity: "error" });
    }
  }

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitDoenca)}
      className="flex items-center justify-center bg-gray-100"
      style={{ height: "80vh" }}
    >
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-purple-600 mb-6 border-b border-gray-300 pb-2">
          Cadastrar Doença
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
            name="Descricao"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                disabled={false}
                label={"Descrição"}
                value={value}
                onChange={onChange}
                sx={{ backgroundColor: "white" }}
                error={Boolean(errors.Descricao)}
              />
            )}
          />
          {errors.Descricao && (
            <FormHelperText sx={{ color: "red" }}>
              {errors.Descricao.message}
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
