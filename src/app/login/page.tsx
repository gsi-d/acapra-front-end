import { Login } from "@mui/icons-material";
import React, { useState } from "react";

export default function LoginPage() {
  const [gmail, setGmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembreMe, setlembreMe] = useState(false);

  const login = (e:any) => {
    e.preventDefault();
    console.log({ gmail, senha, lembreMe });
  };

  return 
}