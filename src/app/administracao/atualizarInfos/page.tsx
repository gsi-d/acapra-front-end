'use client';
import CheckBox from "@/app/components/CheckBox";
import ChipTexto from "@/app/components/Chip";
import GridDados from "@/app/components/DataGrid";
import { enumEspecie, enumGenero, enumStatus, especiesArray, Pet, rowsPet } from "@/types";
import { Box, Chip, FormControl, FormHelperText, IconButton, TextField } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridRowId, GridRowProps, GridValueGetter } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import FormCadastroBase from "@/app/components/FormCadastroBase";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import ComboBox from "@/app/components/ComboBox";

export default function AtualizarInfos() {
    const [toggleFormPets, setToggleFormPets] = useState<boolean>(false);
    const [idEdit, setIdEdit] = useState<number>(0);
    const [petEdicao, setPetEdicao] = useState<Pet | undefined>(undefined);


    const columns: GridColDef<(typeof rowsPet)[number]>[] = [
    {
        width: 100,
        display: 'flex',
        field: 'editar',
        sortable: false,
        headerName: 'Editar',
        editable: false,
        renderCell: (params: GridRenderCellParams) => (
        <IconButton
            color="secondary"
            onClick={() => handleClickEditar(params.id)}>
            <EditIcon />
        </IconButton>
        )
    },
    {
        field: 'Nome',
        headerName: 'Nome',
        width: 150,
        editable: false,
    },
    
    {
        field: 'Especie',
        headerName: 'Especie',
        width: 150,
        editable: false,
        valueGetter: (value, row) => row.Especie,
        renderCell: (params: GridRenderCellParams) => <ChipTexto enumchip={enumEspecie} value={params.row.Especie} />
    },
    {
        field: 'Genero',
        headerName: 'Genero',
        width: 110,
        valueGetter: (value, row) => row.Genero,
        renderCell: (params: GridRenderCellParams) => <ChipTexto enumchip={enumGenero} value={params.row.Genero} />
    },
    {
        field: 'Status',
        headerName: 'Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => row.Status,
        renderCell: (params: GridRenderCellParams) => <ChipTexto enumchip={enumStatus} value={params.row.Status} />
    },
    {
        field: 'Vacinado',
        headerName: 'Vacinado',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        editable: false,
        valueGetter: (value, row) => row.Vacinado,
        renderCell: (params: GridRenderCellParams) => <CheckBox value={params.row.Vacinado} />
    },
    {
        field: 'DataNascimento',
        headerName: 'Data de Nascimento',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => row.DataNascimento,
    },
    ];

      const schema = yup.object().shape({
        id: yup.number(),
        Nome: yup.string().required("Nome é obrigatório"),
        Especie: yup.string(),
        Raca: yup.string().required("Raça é obrigatória"),
        Genero: yup.string().required("Gênero é obrigatório"),
        Status: yup.string().required("Status é obrigatório"),
        Peso: yup.number().required("Peso é obrigatório"),
        DataNascimento: yup.string().required("Data de nascimento é obrigatória"),
        Adotado: yup.boolean(),
        DataAdocao: yup.string(),
        TutorResponsavel: yup.string(),
        Vacinado: yup.boolean(),
        DataUltimaVacina: yup.string(),
        Resgatado: yup.boolean(),
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

    function handleClickEditar(id: GridRowId){
        setToggleFormPets(true);
        setIdEdit(id as number);
    }

    function handleClickNovo(){
        setToggleFormPets(true);
    }

    function handleClickSalvar(){
        
    }

    function handleClickExcluir(){
        console.log('Excluir');
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '85vh', justifyContent: 'center'}}>
            <GridDados handleClickNovo={handleClickNovo} handleClickExcluir={handleClickExcluir} rows={rowsPet} columns={columns}/>
            <FormCadastroBase 
                titulo="Cadastro de Pets" 
                open={toggleFormPets} 
                setOpen={setToggleFormPets} 
                onSubmit={handleClickSalvar}>
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 0}} >
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
                    name='Especie'
                    control={control}
                    rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <ComboBox
                          label={'Especie'}
                          value={especiesArray.find(e => e.id === value) || null}
                          setValue={(option) => onChange(option?.id || '')}
                          options={especiesArray}
                        //   error={Boolean(errors.Especie)}
                        />
                      )}
                     />
                    {errors.Especie && (
                    <FormHelperText sx={{ color: 'red' }}>{errors.Especie.message}</FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                    name='Raca'
                    control={control}
                    rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          disabled={false}
                          label={'Raca'}
                          onChange={onChange}
                          error={Boolean(errors.Raca)}
                        />
                      )}
                     />
                    {errors.Raca && (
                    <FormHelperText sx={{ color: 'red' }}>{errors.Raca.message}</FormHelperText>
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
                          label={'Genero'}
                          onChange={onChange}
                          error={Boolean(errors.Genero)}
                        />
                      )}
                     />
                    {errors.Genero && (
                    <FormHelperText sx={{ color: 'red' }}>{errors.Genero.message}</FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                    name='Status'
                    control={control}
                    rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          disabled={false}
                          label={'Status'}
                          onChange={onChange}
                          error={Boolean(errors.Status)}
                        />
                      )}
                     />
                    {errors.Status && (
                    <FormHelperText sx={{ color: 'red' }}>{errors.Status.message}</FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                    name='Peso'
                    control={control}
                    rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          disabled={false}
                          label={'Peso'}
                          onChange={onChange}
                          error={Boolean(errors.Peso)}
                        />
                      )}
                     />
                    {errors.Peso && (
                    <FormHelperText sx={{ color: 'red' }}>{errors.Peso.message}</FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                    name='DataAdocao'
                    control={control}
                    rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          disabled={false}
                          label={'DataAdocao'}
                          onChange={onChange}
                          error={Boolean(errors.DataAdocao)}
                        />
                      )}
                     />
                    {errors.DataAdocao && (
                    <FormHelperText sx={{ color: 'red' }}>{errors.DataAdocao.message}</FormHelperText>
                    )}
                </FormControl>
                </Box>
            </FormCadastroBase>
        </Box>
    );
}