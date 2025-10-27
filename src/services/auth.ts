import { apiGet } from "./api";

export interface UsuarioLogin {
  id: number;
  nome: string;
  email: string;
  admin?: boolean;
  tb_usuario_admin?: boolean;
}

export interface LoginResult {
  success: boolean;
  data?: UsuarioLogin;
  message?: string;
}

// Realiza login na API utilizando headers `email` e `senha` conforme backend
export async function login(email: string, senha: string): Promise<LoginResult> {
  // Envia credenciais via query params
  const qEmail = encodeURIComponent(email);
  const qSenha = encodeURIComponent(senha);
  return apiGet<LoginResult>(`/usuario/login?email=${qEmail}&senha=${qSenha}`);
}