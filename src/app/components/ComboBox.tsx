'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

export interface OptionType {
  id: string;
  title: string;
}

interface ComboBoxProps{
  options: OptionType[]
  value?: any
  label?: string;
  setValue?: (params: any) => any;
}

export default function ComboBox(props: ComboBoxProps) {
  const {options, value, label, setValue} = props;

  return (
    <div className="flex justify-center items-center mt-4">
      <Autocomplete
        disablePortal
        sx={{ width: '100%' }}
        id="animal-combo-box"
        {...props}
        options={options}
        value={value}
        onChange={(event, newValue) => {
          setValue && setValue(newValue);
        }}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <li
              key={key}
              {...rest}
              className="px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
            >
              {option.title}
            </li>
          );
        }}
        renderInput={(params: any) => <TextField {...params} label={label} />}
      />
    </div>
  );
}
