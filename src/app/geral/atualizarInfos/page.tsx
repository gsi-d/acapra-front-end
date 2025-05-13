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
    { id: 1, Nome: 'Bela', Especie: 'Gato', Genero: 'Fêmea', Status: 'Disponível', Vacinado: false, DataNascimento: '05/02/2018' },
    { id: 2, Nome: 'Rufus', Especie: 'Cachorro', Genero: 'Macho', Status: 'Adotado', Vacinado: true, DataNascimento: '22/09/2015' },
    { id: 3, Nome: 'Sansão', Especie: 'Cachorro', Genero: 'Macho', Status: 'Disponível', Vacinado: false, DataNascimento: '13/11/2021' },
    { id: 4, Nome: 'Lua', Especie: 'Gato', Genero: 'Fêmea', Status: 'Disponível', Vacinado: false, DataNascimento: '14/05/2020' },
    { id: 5, Nome: 'Branca', Especie: 'Cachorro', Genero: 'Fêmea', Status: 'Disponível', Vacinado: false, DataNascimento: '05/02/2018' },
    { id: 6, Nome: 'Max', Especie: 'Cachorro', Genero: 'Macho', Status: 'Disponível', Vacinado: true, DataNascimento: '08/06/2020' },
    { id: 7, Nome: 'Mia', Especie: 'Gato', Genero: 'Fêmea', Status: 'Disponível', Vacinado: false, DataNascimento: '11/01/2019' },
    { id: 8, Nome: 'Rex', Especie: 'Cachorro', Genero: 'Macho', Status: 'Adotado', Vacinado: true, DataNascimento: '07/12/2017' },
    { id: 9, Nome: 'Nina', Especie: 'Gato', Genero: 'Fêmea', Status: 'Disponível', Vacinado: false, DataNascimento: '23/04/2021' },
    { id: 10, Nome: 'Charlie', Especie: 'Cachorro', Genero: 'Macho', Status: 'Disponível', Vacinado: true, DataNascimento: '01/09/2018' },
    { id: 11, Nome: 'Luna', Especie: 'Gato', Genero: 'Fêmea', Status: 'Adotado', Vacinado: true, DataNascimento: '15/07/2020' },
    { id: 12, Nome: 'Thor', Especie: 'Cachorro', Genero: 'Macho', Status: 'Disponível', Vacinado: false, DataNascimento: '25/03/2019' },
    { id: 13, Nome: 'Bella', Especie: 'Gato', Genero: 'Fêmea', Status: 'Disponível', Vacinado: true, DataNascimento: '10/08/2017' },
    { id: 14, Nome: 'Simba', Especie: 'Cachorro', Genero: 'Macho', Status: 'Adotado', Vacinado: true, DataNascimento: '14/02/2016' },
    { id: 15, Nome: 'Zara', Especie: 'Gato', Genero: 'Fêmea', Status: 'Disponível', Vacinado: false, DataNascimento: '18/05/2021' },
    { id: 16, Nome: 'Oscar', Especie: 'Cachorro', Genero: 'Macho', Status: 'Adotado', Vacinado: true, DataNascimento: '12/11/2018' },
    { id: 17, Nome: 'Cleo', Especie: 'Gato', Genero: 'Fêmea', Status: 'Disponível', Vacinado: false, DataNascimento: '20/06/2020' },
    { id: 18, Nome: 'Toby', Especie: 'Cachorro', Genero: 'Macho', Status: 'Disponível', Vacinado: true, DataNascimento: '04/10/2021' },
    { id: 19, Nome: 'Pepper', Especie: 'Gato', Genero: 'Fêmea', Status: 'Adotado', Vacinado: true, DataNascimento: '02/02/2019' },
    { id: 20, Nome: 'Buddy', Especie: 'Cachorro', Genero: 'Macho', Status: 'Disponível', Vacinado: true, DataNascimento: '29/08/2020' },
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
        Nome: yup.string().required("Nome é obrigatório"),
        Especie: yup.string().required("Espécie é obrigatória"),
        Genero: yup.string().required("Gênero é obrigatório"),
        Status: yup.string().required("Status é obrigatório"),
        Vacinado: yup.boolean().required("Vacinação é obrigatória"),
        DataNascimento: yup.string().required("Data de nascimento é obrigatória"),
    });

    const valoresIniciais = {
        Id: 0,
        Nome: '',
        Especie: '',
        Genero: '',
        Status: '',
        Vacinado: false,
        DataNascimento: '',
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
            Id: petEdicao.id,
            Nome: petEdicao.Nome,
            Especie: petEdicao.Especie,
            Genero: petEdicao.Genero,
            Status: petEdicao.Status,
            Vacinado: petEdicao.Vacinado,
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
                <Box sx={{ p: 3, display: 'grid',
                gridTemplateColumns: { sm: '1fr 1fr 1fr'},
                rowGap: 0,
                columnGap: 2,
                gridTemplateAreas: {
                sm: `
                        "nome . ."
                        "especie especie especie"
                        "raca raca raca"
                        "genero genero genero"
                        "status status status"
                        "peso peso fotos"
                        "datanascimento datanascimento"
                        "adotado dataadocao tutorResponsavel"
                        "vacinado datavacina"
                        "resgatado dataresgate local"
                        `,
        }}} >
                    <FormControl fullWidth sx={{ mb: 6, gridArea: 'nome' }}>
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
                </Box>
            </FormCadastroBase>
        </Box>
    );
}