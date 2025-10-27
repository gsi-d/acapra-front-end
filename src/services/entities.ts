import { apiGet, apiPost } from "./api";

export interface CreateResponse { success?: boolean; data?: any; message?: string }

// Raça
export async function listarRacas() {
  try {
    const res = await apiGet<any>(`/raca`);
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
  } catch {
    try {
      const res2 = await apiGet<any>(`/racas`);
      if (Array.isArray(res2)) return res2;
      if (res2 && Array.isArray(res2.data)) return res2.data;
    } catch {}
    return [];
  }
}
// Accepts UI-level fields and maps to DB column names
export async function criarRaca(payload: { Nome: string; Especie: number }) {
  const especieNome = payload.Especie === 1 ? "Cachorro" : "Gato";
  const body = {
    tb_raca_nome_raca: payload.Nome,
    tb_raca_nome_especie: especieNome,
    tb_raca_inativo: false,
  };
  return apiPost<CreateResponse>(`/raca`, body);
}

// Doença
export async function criarDoenca(payload: { Nome: string; Descricao: string }) {
  const body = {
    tb_doenca_nome: payload.Nome,
    tb_doenca_descricao: payload.Descricao,
    tb_doenca_inativo: false,
  };
  return apiPost<CreateResponse>(`/doenca`, body);
}

export async function listarDoencas() {
  try {
    const res = await apiGet<any>(`/doenca`);
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
  } catch {
    try {
      const res2 = await apiGet<any>(`/doencas`);
      if (Array.isArray(res2)) return res2;
      if (res2 && Array.isArray(res2.data)) return res2.data;
    } catch {}
    return [];
  }
}

// Vacina
export async function criarVacina(payload: { Nome: string; DataVacina: string }) {
  const body = {
    tb_vacina_nome: payload.Nome,
    tb_vacina_data_vacina: payload.DataVacina,
  };
  return apiPost<CreateResponse>(`/vacina`, body);
}

export async function listarVacinas() {
  try {
    const res = await apiGet<any>(`/vacina`);
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
  } catch {
    try {
      const res2 = await apiGet<any>(`/vacinas`);
      if (Array.isArray(res2)) return res2;
      if (res2 && Array.isArray(res2.data)) return res2.data;
    } catch {}
    return [];
  }
}

// Visita (tb_agenda_visita)
export async function criarVisita(payload: { Id_Usuario: number; Id_Pet: number; Data: string; Observacoes?: string }) {
  const body = {
    tb_agenda_visita_data_visita: payload.Data,
    tb_agenda_visita_observacoes: payload.Observacoes,
    id_pet: payload.Id_Pet,
    id_usuario: payload.Id_Usuario,
    tb_agenda_visita_inativo: false,
  };
  return apiPost<CreateResponse>(`/visita`, body);
}

// Adoção (mantido genérico por enquanto)
export async function criarAdocao(payload: Record<string, any>) {
  return apiPost<CreateResponse>(`/adocao`, payload);
}

// Históricos
export async function criarHistoricoVacina(payload: { id_pet: number; id_vacina: number; dataAplicacao: string; dataProximaAplicacao: string }) {
  const body = {
    id_pet: payload.id_pet,
    id_vacina: payload.id_vacina,
    tb_his_vacina_data_aplicacao: payload.dataAplicacao,
    tb_his_vacina_proxima_aplicacao: payload.dataProximaAplicacao,
    tb_his_vacina_inativo: false,
  };
  return apiPost<CreateResponse>(`/historicoVacina`, body);
}
export async function criarHistoricoDoenca(payload: { id_pet: number; id_doenca: number; dataDiagnostico: string; status: string }) {
  const body = {
    id_pet: payload.id_pet,
    id_doenca: payload.id_doenca,
    tb_historico_doenca_data_diagnostico: payload.dataDiagnostico,
    tb_historico_doenca_status: payload.status,
  };
  return apiPost<CreateResponse>(`/historicoDoenca`, body);
}

export async function listarUsuarios() {
  try {
    const res = await apiGet<any>(`/usuario`);
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
  } catch {
    try {
      const res2 = await apiGet<any>(`/usuarios`);
      if (Array.isArray(res2)) return res2;
      if (res2 && Array.isArray(res2.data)) return res2.data;
    } catch {}
    return [];
  }
}
