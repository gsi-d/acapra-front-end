'use client';

import CheckBox from "@/app/components/CheckBox";
import ChipTexto from "@/app/components/Chip";
import GridDados from "@/app/components/DataGrid";
import {
  enumEspecie,
  enumGenero,
  enumStatus,
  Pet,
} from "@/types";
import {
  Box,
  IconButton,
} from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useContextoMock } from "@/contextos/ContextoMock";

export default function AtualizarInfos() {
  const router = useRouter();
  const {pets, setPets} = useContextoMock();
  const [selectedItems, setSelectedItems] = useState<GridRowSelectionModel>();

  const columns: GridColDef<(typeof pets)[number]>[] = [
    {
      width: 100,
      display: "flex",
      field: "editar",
      sortable: false,
      headerName: "Editar",
      editable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          color="secondary"
          onClick={() => handleClickEditar(params.id)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "Nome",
      headerName: "Nome",
      width: 150,
      editable: false,
    },

    {
      field: "Especie",
      headerName: "Especie",
      width: 150,
      editable: false,
      valueGetter: (value, row) => row.Especie,
      renderCell: (params: GridRenderCellParams) => (
        <ChipTexto enumchip={enumEspecie} value={params.row.Especie} />
      ),
    },
    {
      field: "Genero",
      headerName: "Genero",
      width: 110,
      valueGetter: (value, row) => row.Genero,
      renderCell: (params: GridRenderCellParams) => (
        <ChipTexto enumchip={enumGenero} value={params.row.Genero} />
      ),
    },
    {
      field: "Status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) => row.Status,
      renderCell: (params: GridRenderCellParams) => (
        <ChipTexto enumchip={enumStatus} value={params.row.Status} />
      ),
    },
    {
      field: "Vacinado",
      headerName: "Vacinado",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      editable: false,
      valueGetter: (value, row) => row.Vacinado,
      renderCell: (params: GridRenderCellParams) => (
        <CheckBox value={params.row.Vacinado} />
      ),
    },
    {
      field: "DataNascimento",
      headerName: "Data de Nascimento",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) => row.DataNascimento,
    },
  ];

  function handleClickEditar(id: GridRowId) {
    router.push('/geral/cadastroPet?id=' + id);
  }

  function handleClickNovo() {
    router.push("/geral/cadastroPet");
  }

const updateSelectedItems = (newSelectionModel: GridRowSelectionModel) => {
    setSelectedItems(newSelectionModel);
  };

  function handleClickExcluir() {
  if (selectedItems && selectedItems.ids.size > 0) {
    const petsAtualizados = pets.filter(pet => {
      if (pet.id === undefined) return true;
      return !selectedItems.ids.has(pet.id);
    });
    setPets(petsAtualizados);
  }
}


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "85vh",
        justifyContent: "center",
      }}
    >
      <GridDados
        handleClickNovo={handleClickNovo}
        handleClickExcluir={handleClickExcluir}
        selectedItems={selectedItems}
        updateSelectedItems={updateSelectedItems}
        rows={pets}
        columns={columns}
      />
    </Box>
  );
}
