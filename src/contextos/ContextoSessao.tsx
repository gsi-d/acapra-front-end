"use client";

import { createContext, ReactNode, useContext, useMemo, useState, useEffect } from "react";

export interface Sessao {
  isAdm: boolean;
  logado: boolean;
  emailSalvo: string | null;
}

interface SessaoContextValue {
  sessao: Sessao;
  setSessao: (patch: Partial<Sessao>) => void;
  limparSessao: () => void;
  ready: boolean;
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
  ready: false,
});

export const useSessao = () => useContext(SessaoContext);

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

const COOKIE_NAME = "acapra_sessao";
const SESSION_KEY = "acapra_session_state"; // persiste apenas durante a sessão/aba atual

function readSession(): Partial<Sessao> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<Sessao>;
  } catch {
    return null;
  }
}

function writeSession(state: Partial<Sessao> | null) {
  if (typeof window === "undefined") return;
  try {
    if (!state) {
      window.sessionStorage.removeItem(SESSION_KEY);
    } else {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    }
  } catch {}
}

export function SessaoProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessaoState] = useState<Sessao>(defaultSessao);
  const [ready, setReady] = useState(false);

  const setSessao = (patch: Partial<Sessao>) =>
    setSessaoState((prev) => ({ ...prev, ...patch }));

  const limparSessao = () => {
    deleteCookie(COOKIE_NAME);
    writeSession(null);
    setSessaoState(defaultSessao);
  };

  if (typeof window !== "undefined") {
  }

  useEffect(() => {
    try {
      // 1) Prioriza estado da sessão (mantém login após F5 mesmo sem lembrar de mim)
      const s = readSession();
      if (s && s.logado) {
        setSessaoState({
          isAdm: Boolean(s.isAdm),
          logado: true,
          emailSalvo: s.emailSalvo ?? null,
        });
        setReady(true);
        return;
      }
      // 2) Se não houver sessão, tenta cookie de "lembrar de mim"
      const v = getCookie(COOKIE_NAME);
      if (v) {
        const parsed = JSON.parse(v) as { isAdm?: boolean; email?: string };
        setSessaoState({
          isAdm: Boolean(parsed.isAdm),
          logado: true,
          emailSalvo: parsed.email ?? null,
        });
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (sessao.logado && sessao.emailSalvo) {
      const payload = { isAdm: sessao.isAdm, email: sessao.emailSalvo };
      setCookie(COOKIE_NAME, JSON.stringify(payload), 30); // 30 days
    } else {
      deleteCookie(COOKIE_NAME);
    }
  }, [sessao.logado, sessao.emailSalvo, sessao.isAdm, ready]);

  // Mantém o estado da sessão na aba atual (sobrevive a F5)
  useEffect(() => {
    if (!ready) return;
    if (sessao.logado) {
      writeSession({ isAdm: sessao.isAdm, logado: true, emailSalvo: sessao.emailSalvo });
    } else {
      writeSession(null);
    }
  }, [sessao.logado, sessao.isAdm, sessao.emailSalvo, ready]);

  const value = useMemo(
    () => ({ sessao, setSessao, limparSessao, ready }),
    [sessao, ready]
  );

  return (
    <SessaoContext.Provider value={value}>{children}</SessaoContext.Provider>
  );
}
