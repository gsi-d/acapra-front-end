'use client';
import React, { useState } from 'react';
import Input from '@/app/components/input';
import ComboBox, { OptionType } from '@/app/components/ComboBox';
import { Button } from "@mui/material";
export default function CadastroRaca() {
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-purple-600 mb-6 border-b border-gray-300 pb-2">
                    Cadastrar Vacina
                </h1>
                <div className="flex flex-col gap-4">
                    <Input label="Nome" required />
                    <Input label="Data para vacinação" required />
                </div>
                <div className="flex justify-end mt-4"><Button sx={{ background: '#7C3AED' }} variant='contained' color='secondary'>Salvar</Button></div>
            </div>
        </div>
    );
}