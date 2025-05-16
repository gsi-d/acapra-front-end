'use client';
import React, { useState } from 'react';
import Input from '@/app/components/input';
import ComboBox, { OptionType } from '@/app/components/ComboBox';
import {Button} from "@mui/material";
export default function CadastroRaca() {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const animalOptions: OptionType[] = [
    { id: '1', title: 'Gato' },
    { id: '2', title: 'Cachorro' },
  ];

  return (
    <div className="flex items-center justify-center bg-gray-100" style={{ height: '80vh' }}>
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-purple-600 mb-6 border-b border-gray-300 pb-2">
          Adicionar Raça
        </h1>

        <Input label="Nome" required />

        <ComboBox
          options={animalOptions}
          label="Tipo de Animal"
          value={selectedOption}
          setValue={setSelectedOption}
        />
        <div className="flex justify-end mt-4"><Button sx={{background:'#7C3AED'}} variant='contained' color='secondary'>Salvar</Button></div>
      </div>
    </div>
  );
}
