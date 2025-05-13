'use client';
import CheckBox from "@/app/components/CheckBox";
import ChipTexto from "@/app/components/Chip";
import GridDados from "@/app/components/DataGrid";
import { enumEspecie, enumGenero, enumStatus, Pet } from "@/types";
import { Box, Chip, FormControl, FormHelperText, IconButton, TextField } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridRowId, GridRowProps, GridValueGetter } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import FormCadastroBase from "@/app/components/FormCadastroBase";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

export default function AtualizarInfos() {
    const [toggleFormPets, setToggleFormPets] = useState<boolean>(false);
    const [idEdit, setIdEdit] = useState<number>(0);
    const [petEdicao, setPetEdicao] = useState<Pet | undefined>(undefined);

    const [rows, setRows] = useState<Pet[]>([
    { 
        id: 1, 
        Nome: 'Bela', 
        Especie: 'Gato', 
        Raca: 'Persa', 
        Genero: 'Fêmea', 
        Status: 'Disponível', 
        Peso: 3.5, 
        Adotado: false, 
        Vacinado: false, 
        TutorResponsavel: 'Ana', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '05/02/2018' 
    },
    { 
        id: 2, 
        Nome: 'Rufus', 
        Especie: 'Cachorro', 
        Raca: 'Labrador', 
        Genero: 'Macho', 
        Status: 'Adotado', 
        Peso: 25, 
        Adotado: true, 
        Vacinado: true, 
        TutorResponsavel: 'Carlos', 
        Resgatado: true, 
        LocalResgate: 'Rua', 
        DataNascimento: '22/09/2015' 
    },
    { 
        id: 3, 
        Nome: 'Sansão', 
        Especie: 'Cachorro', 
        Raca: 'Pitbull', 
        Genero: 'Macho', 
        Status: 'Disponível', 
        Peso: 15, 
        Adotado: false, 
        Vacinado: false, 
        TutorResponsavel: 'João', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '13/11/2021' 
    },
    { 
        id: 4, 
        Nome: 'Lua', 
        Especie: 'Gato', 
        Raca: 'Siamês', 
        Genero: 'Fêmea', 
        Status: 'Disponível', 
        Peso: 3, 
        Adotado: false, 
        Vacinado: false, 
        TutorResponsavel: 'Mariana', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '14/05/2020' 
    },
    { 
        id: 5, 
        Nome: 'Branca', 
        Especie: 'Cachorro', 
        Raca: 'Poodle', 
        Genero: 'Fêmea', 
        Status: 'Disponível', 
        Peso: 5, 
        Adotado: false, 
        Vacinado: false, 
        TutorResponsavel: 'Fernanda', 
        Resgatado: true, 
        LocalResgate: 'Avenida', 
        DataNascimento: '05/02/2018' 
    },
    { 
        id: 6, 
        Nome: 'Max', 
        Especie: 'Cachorro', 
        Raca: 'Golden Retriever', 
        Genero: 'Macho', 
        Status: 'Disponível', 
        Peso: 30, 
        Adotado: false, 
        Vacinado: true, 
        TutorResponsavel: 'Lucas', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '08/06/2020' 
    },
    { 
        id: 7, 
        Nome: 'Mia', 
        Especie: 'Gato', 
        Raca: 'Maine Coon', 
        Genero: 'Fêmea', 
        Status: 'Disponível', 
        Peso: 4, 
        Adotado: false, 
        Vacinado: false, 
        TutorResponsavel: 'Roberta', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '11/01/2019' 
    },
    { 
        id: 8, 
        Nome: 'Rex', 
        Especie: 'Cachorro', 
        Raca: 'Dobermann', 
        Genero: 'Macho', 
        Status: 'Adotado', 
        Peso: 40, 
        Adotado: true, 
        Vacinado: true, 
        TutorResponsavel: 'Carlos', 
        Resgatado: true, 
        LocalResgate: 'Praça', 
        DataNascimento: '07/12/2017' 
    },
    { 
        id: 9, 
        Nome: 'Nina', 
        Especie: 'Gato', 
        Raca: 'Bengal', 
        Genero: 'Fêmea', 
        Status: 'Disponível', 
        Peso: 3, 
        Adotado: false, 
        Vacinado: false, 
        TutorResponsavel: 'Julia', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '23/04/2021' 
    },
    { 
        id: 10, 
        Nome: 'Charlie', 
        Especie: 'Cachorro', 
        Raca: 'Bulldog', 
        Genero: 'Macho', 
        Status: 'Disponível', 
        Peso: 20, 
        Adotado: false, 
        Vacinado: true, 
        TutorResponsavel: 'Roberto', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '01/09/2018' 
    },
    { 
        id: 11, 
        Nome: 'Luna', 
        Especie: 'Gato', 
        Raca: 'Persa', 
        Genero: 'Fêmea', 
        Status: 'Adotado', 
        Peso: 3.2, 
        Adotado: true, 
        Vacinado: true, 
        TutorResponsavel: 'Monique', 
        Resgatado: true, 
        LocalResgate: 'Lagoa', 
        DataNascimento: '15/07/2020' 
    },
    { 
        id: 12, 
        Nome: 'Thor', 
        Especie: 'Cachorro', 
        Raca: 'Husky', 
        Genero: 'Macho', 
        Status: 'Disponível', 
        Peso: 25, 
        Adotado: false, 
        Vacinado: false, 
        TutorResponsavel: 'Eduardo', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '25/03/2019' 
    },
    { 
        id: 13, 
        Nome: 'Bella', 
        Especie: 'Gato', 
        Raca: 'Siamês', 
        Genero: 'Fêmea', 
        Status: 'Disponível', 
        Peso: 3.8, 
        Adotado: false, 
        Vacinado: true, 
        TutorResponsavel: 'Carmen', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '10/08/2017' 
    },
    { 
        id: 14, 
        Nome: 'Simba', 
        Especie: 'Cachorro', 
        Raca: 'Pastor Alemão', 
        Genero: 'Macho', 
        Status: 'Adotado', 
        Peso: 35, 
        Adotado: true, 
        Vacinado: true, 
        TutorResponsavel: 'Beatriz', 
        Resgatado: true, 
        LocalResgate: 'Rua', 
        DataNascimento: '14/02/2016' 
    },
    { 
        id: 15, 
        Nome: 'Zara', 
        Especie: 'Gato', 
        Raca: 'Bengal', 
        Genero: 'Fêmea', 
        Status: 'Disponível', 
        Peso: 4, 
        Adotado: false, 
        Vacinado: false, 
        TutorResponsavel: 'Flávia', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '18/05/2021' 
    },
    { 
        id: 16, 
        Nome: 'Oscar', 
        Especie: 'Cachorro', 
        Raca: 'Bulldog', 
        Genero: 'Macho', 
        Status: 'Adotado', 
        Peso: 22, 
        Adotado: true, 
        Vacinado: true, 
        TutorResponsavel: 'Felipe', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '12/11/2018' 
    },
    { 
        id: 17, 
        Nome: 'Cleo', 
        Especie: 'Gato', 
        Raca: 'Angorá', 
        Genero: 'Fêmea', 
        Status: 'Disponível', 
        Peso: 2.5, 
        Adotado: false, 
        Vacinado: false, 
        TutorResponsavel: 'Beatriz', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '20/06/2020' 
    },
    { 
        id: 18, 
        Nome: 'Toby', 
        Especie: 'Cachorro', 
        Raca: 'Shih Tzu', 
        Genero: 'Macho', 
        Status: 'Disponível', 
        Peso: 6, 
        Adotado: false, 
        Vacinado: true, 
        TutorResponsavel: 'Juliana', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '04/10/2021' 
    },
    { 
        id: 19, 
        Nome: 'Pepper', 
        Especie: 'Gato', 
        Raca: 'Siamês', 
        Genero: 'Fêmea', 
        Status: 'Adotado', 
        Peso: 3, 
        Adotado: true, 
        Vacinado: true, 
        TutorResponsavel: 'Renata', 
        Resgatado: true, 
        LocalResgate: 'Praça', 
        DataNascimento: '02/02/2019' 
    },
    { 
        id: 20, 
        Nome: 'Buddy', 
        Especie: 'Cachorro', 
        Raca: 'Beagle', 
        Genero: 'Macho', 
        Status: 'Disponível', 
        Peso: 10, 
        Adotado: false, 
        Vacinado: true, 
        TutorResponsavel: 'Fernanda', 
        Resgatado: false, 
        LocalResgate: 'N/A', 
        DataNascimento: '29/08/2020' 
    }
]);



    
    const columns: GridColDef<(typeof rows)[number]>[] = [
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
        Especie: yup.string().required("Espécie é obrigatória"),
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
            <GridDados handleClickNovo={handleClickNovo} handleClickExcluir={handleClickExcluir} rows={rows} columns={columns}/>
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
                        <TextField
                          disabled={false}
                          label={'Especie'}
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.Especie)}
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