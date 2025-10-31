"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface TimelineItem {
  date?: string | null;
  title: string;
  subtitle?: string | null;
}

export default function TimelineDialog({
  open,
  onClose,
  title,
  items,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  items: TimelineItem[];
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pr: 6 }}>
        {title}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ position: "relative", pl: 3 }}>
          <Box
            sx={{
              position: "absolute",
              left: 12,
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: "#eee",
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {items && items.length > 0 ? (
              items.map((it, idx) => (
                <Box key={idx} sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        bgcolor: "#7C3AED",
                        borderRadius: "50%",
                        mt: 0.75,
                      }}
                    />
                  </Box>
                  <Box>
                    {it.date && (
                      <Typography variant="caption" color="text.secondary">
                        {it.date}
                      </Typography>
                    )}
                    <Typography variant="body1" fontWeight={600}>
                      {it.title}
                    </Typography>
                    {it.subtitle && (
                      <Typography variant="body2" color="text.secondary">
                        {it.subtitle}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">
                Nenhum registro encontrado.
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
