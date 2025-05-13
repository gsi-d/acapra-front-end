'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface AnimalOptionType {
  title: string;
}

const animalOptions: AnimalOptionType[] = [
  { title: 'Gato' },
  { title: 'Cachorro' },
  { title: 'Rato' },
  { title: 'Pássaro' },
];

export default function ComboBox() {
  const [value, setValue] = React.useState<AnimalOptionType | null>(null);

  return (
    <div className="flex justify-center items-center mt-4">
      <Autocomplete
        disablePortal
        sx={{ width: 300 }}
        id="animal-combo-box"
        options={animalOptions}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
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
        renderInput={(params) => <TextField {...params} label="Raça" />}
      />
    </div>
  );
}
