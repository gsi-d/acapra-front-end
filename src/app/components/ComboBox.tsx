"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

export interface OptionType {
  id: string;
  title: string;
}

interface ComboBoxProps {
  options: OptionType[];
  value?: any;
  label?: string;
  error?: boolean;
  setValue?: (params: any) => any;
}

export default function ComboBox(props: ComboBoxProps) {
  const { options, value, label, error, setValue } = props;

  return (
    <div className="flex justify-center items-center ">
      <Autocomplete
        disablePortal
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            "&.Mui-focused fieldset": {
              borderColor: "#7C3AED",
              boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.2)",
            },
          },
          "& label.Mui-focused": {
            color: "#7C3AED",
          },
          "& input::placeholder": {
            opacity: 1,
            color: "#4E4958",
            fontFamily: "Roboto",
          },
          "& input": {
            fontFamily: "Roboto",
            fontSize: "14px",
          },
          "& label": {
            fontFamily: "Roboto",
          },
        }}
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
        renderInput={(params: any) => (
          <TextField
            sx={{ backgroundColor: "white" }}
            {...params}
            label={label}
            error={error}
          />
        )}
      />
    </div>
  );
}
