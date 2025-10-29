"use client";

import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export interface ImageUploaderProps {
  label?: string;
  value?: string | null;
  onChange?: (file: File | null, previewUrl: string | null) => void;
  disabled?: boolean;
  accept?: string;
}

export default function ImageUploader(props: ImageUploaderProps) {
  const { label = "Foto", value = null, onChange, disabled, accept = "image/*" } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setPreviewUrl(value ?? null);
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handlePick() {
    if (disabled) return;
    inputRef.current?.click();
  }

  function handleRemove() {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFile(null);
    onChange?.(null, null);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    const url = URL.createObjectURL(f);
    setFile(f);
    setPreviewUrl(url);
    onChange?.(f, url);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {label && (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 140,
            height: 140,
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "#f1f1f1",
            border: "1px solid #e0e0e0",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography variant="caption" color="text.secondary">
              Sem imagem
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button variant="outlined" onClick={handlePick} disabled={disabled}>
            Selecionar imagem
          </Button>
          <Button variant="text" color="error" onClick={handleRemove} disabled={disabled || !previewUrl}>
            Remover
          </Button>
        </Box>
      </Box>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </Box>
  );
}
