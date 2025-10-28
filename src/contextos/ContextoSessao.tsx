"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface Sessao {
  isAdm: boolean;
  logado: boolean;
  emailSalvo: string | null;
}

interface SessaoContextValue {
  sessao: Sessao;
  setSessao: (patch: Partial<Sessao>) => void;
  limparSessao: () => void;
}

const defaultSessao: Sessao = {
  isAdm: false,
  logado: false,
  emailSalvo: null,
};

const SessaoContext = createContext<SessaoContextValue>({
  sessao: defaultSessao,
  setSessao: () => {},
  limparSessao: () => {},
});

export const useSessao = () => useContext(SessaoContext);

export function SessaoProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessaoState] = useState<Sessao>(defaultSessao);

  const setSessao = (patch: Partial<Sessao>) =>
    setSessaoState((prev) => ({ ...prev, ...patch }));

  const limparSessao = () => setSessaoState(defaultSessao);

  const value = useMemo(
    () => ({ sessao, setSessao, limparSessao }),
    [sessao]
  );

  return (
    <SessaoContext.Provider value={value}>{children}</SessaoContext.Provider>
  );
}

