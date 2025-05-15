import { Button, Toolbar, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridToolbarProps } from "@mui/x-data-grid/internals";
import { ToolbarPropsOverrides } from "@mui/x-data-grid";

export interface ToolbarDataGridProps extends GridToolbarProps, ToolbarPropsOverrides {
    handleClickNovo?: () => void
    handleClickExcluir?: () => void
}

export default function ToolbarDataGrid(props: ToolbarDataGridProps){
    const {handleClickNovo, handleClickExcluir} = props
    return (
        <Toolbar sx={{ gap: 2, display: 'flex', justifyContent: 'flex-end'}}>
            <Typography variant="h6" color="secondary" fontWeight={600} fontSize={30} component="div" sx={{ flexGrow: 1 }}>Pets</Typography>
            <Button onClick={handleClickNovo} color="secondary" variant="contained" size="small" startIcon={<AddIcon />}>Novo</Button>
            <Button onClick={handleClickExcluir} color="error" variant="contained" size="small" startIcon={<DeleteIcon />}>Excluir</Button>
        </Toolbar>
    )
}