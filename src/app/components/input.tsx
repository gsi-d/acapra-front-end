// components/CustomTextField.tsx
import * as React from 'react';
import TextField from '@mui/material/TextField';

interface CustomTextFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  id?: string;
}

export default function CustomTextField({
  label,
  placeholder,
  required = false,
  defaultValue = '',
  id = 'custom-input',
}: CustomTextFieldProps) {
  return (
    <TextField
      required={required}
      id={id}
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      fullWidth
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          '&.Mui-focused fieldset': {
            borderColor: '#7C3AED',
            boxShadow: '0 0 0 2px rgba(124, 58, 237, 0.2)',
          },
        },
        '& label.Mui-focused': {
          color: '#7C3AED',
        },
        '& input::placeholder': {
          opacity: 1,
          color: '#4E4958',
          fontFamily: 'Poppins',
        },
        '& input': {
          fontFamily: 'Poppins',
          fontSize: '14px',
        },
        '& label': {
          fontFamily: 'Poppins',
        },
      }}
    />
  );
}
