"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  DataGridProps,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import ToolbarDataGrid from "./ToolbarDataGrid";

interface GridDadosProps {
  sx?: React.CSSProperties;
  height?: number;
  width?: any;
  rows?: any;
  columns?: any;
  handleClickNovo: () => void;
  handleClickExcluir: () => void;
}

export default function GridDados(props: GridDadosProps) {
  const {
    sx,
    height = 600,
    width = "80%",
    rows,
    columns,
    handleClickNovo,
    handleClickExcluir,
  } = props;
  return (
    <Box sx={{ ...sx, height: height, width: width }}>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        showToolbar
        disableColumnSelector
        slots={{
          toolbar: ToolbarDataGrid,
        }}
        slotProps={{
          toolbar: {
            handleClickNovo: handleClickNovo,
            handleClickExcluir: handleClickExcluir,
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
