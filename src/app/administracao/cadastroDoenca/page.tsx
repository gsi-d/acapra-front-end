'use client'
import { especiesArray, Pet } from "@/types";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Chip, Divider, FormControl, FormControlLabel, FormHelperText, IconButton, TextField, Typography } from "@mui/material";
import ComboBox from "@/app/components/ComboBox";
import CheckBox from "@/app/components/CheckBox";

export default function CadastroVacina() {
    const [idEdit, setIdEdit] = useState<number>(0);
    const [petEdicao, setPetEdicao] = useState<Pet | undefined>(undefined);
    const schema = yup.object().shape({
        id: yup.number(),
        Nome: yup.string().required("Nome é obrigatório"),
        Especie: yup.string().required("Espécie é obrigatória"),
        Raca: yup.string().required("Raça é obrigatória"),
        Genero: yup.string().required("Gênero é obrigatório"),
        Status: yup.string().required("Status é obrigatório"),
        Peso: yup.number().required("Peso é obrigatório"),
        DataNascimento: yup.string().required("Data de nascimento é obrigatória"),
        Adotado: yup.boolean().required(),
        DataAdocao: yup.string(),
        TutorResponsavel: yup.string(),
        Vacinado: yup.boolean().required(),
        DataUltimaVacina: yup.string(),
        Resgatado: yup.boolean().required(),
        DataResgate: yup.string(),
        LocalResgate: yup.string(),
    });

    const valoresIniciais = {
        id: 0,
        Nome: '',
        Especie: '',
        Raca: '',
        Genero: '',
        Status: '',
        DataNascimento: '',
        Peso: 0,
        Adotado: false,
        DataAdocao: '',
        TutorResponsavel: '',
        Vacinado: false,
        DataUltimaVacina: '',
        Resgatado: false,
        DataResgate: '',
        LocalResgate: ''
    };

    const {
        reset,
        control,
        trigger,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: valoresIniciais,
        values: petEdicao !== undefined ? {
            id: petEdicao.id,
            Nome: petEdicao.Nome,
            Especie: petEdicao.Especie,
            Raca: petEdicao.Raca,
            Genero: petEdicao.Genero,
            Status: petEdicao.Status,
            Peso: petEdicao.Peso,
            Adotado: petEdicao.Adotado,
            DataAdocao: petEdicao.DataAdocao,
            TutorResponsavel: petEdicao.TutorResponsavel,
            Vacinado: petEdicao.Vacinado,
            DataUltimaVacina: petEdicao.DataUltimaVacina,
            Resgatado: petEdicao.Resgatado,
            DataResgate: petEdicao.DataResgate,
            LocalResgate: petEdicao.LocalResgate,
            DataNascimento: petEdicao.DataNascimento
        } : valoresIniciais,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    function handleClose() {

    }

    function onSubmit() {

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 5 }}>
            <Box className="bg-black/10" sx={{ p: 5, display: 'flex', flexDirection: 'column', gap: 0, width: '50%', borderRadius: '0.5rem' }} >
                <Typography variant="h6" color="secondary" fontWeight={600} fontSize={30} component="div" >Cadastrar Doença</Typography>
                <Divider sx={{ my: 2, backgroundColor: 'white', height: '2px' }} />
                <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                        name='Nome'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                disabled={false}
                                label={'Nome'}
                                onChange={onChange}
                                sx={{ backgroundColor: 'white' }}
                                error={Boolean(errors.Nome)}
                            />
                        )}
                    />
                    {errors.Nome && (
                        <FormHelperText sx={{ color: 'red' }}>{errors.Nome.message}</FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                        name='Genero'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                disabled={false}
                                label={'Descrição'}
                                onChange={onChange}
                                sx={{ backgroundColor: 'white' }}
                                error={Boolean(errors.Genero)}
                            />
                        )}
                    />
                    {errors.Genero && (
                        <FormHelperText sx={{ color: 'red' }}>{errors.Genero.message}</FormHelperText>
                    )}
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}></Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 5 }}>
                    <Button variant='contained' color='secondary' onClick={onSubmit}>Salvar</Button>
                </Box>
            </Box>
        </Box>
    );
}