import { apiGet, apiPost, apiPut } from "./api";
import { Pet, tbPet } from "@/types";

// Paths are relative to API_BASE configured in next.config.ts rewrites
const PETS_BASE = "/pet";

// Map UI Pet (form) -> DB payload for tb_pet
export function mapUiPetToDb(payload: Pet) {
  // Only include known columns used on backend
  return {
    id_pet: payload.id,
    tb_pet_nome: payload.Nome,
    tb_especie: payload.Especie,
    id_raca: payload.Id_Raca,
    tb_pet_genero: payload.Genero,
    tb_pet_porte: payload.Porte ?? null,
    tb_pet_status_pet: payload.Status,
    tb_pet_data_nascimento: payload.DataNascimento ? payload.DataNascimento : null,
    // adoção
    tb_pet_adotado: payload.Adotado,
    tb_data_adocao: payload.DataAdocao ? payload.DataAdocao : null,
    tb_pet_vacinado: payload.Vacinado,
    tb_pet_resgatado: payload.Resgatado,
    tb_pet_data_resgaste: payload.DataResgate ? payload.DataResgate : null,
    tb_pet_local_resgaste: payload.LocalResgate,
  };
}

// Map DB record -> tbPet (used in catalog grid)
export function mapDbPetToTbPet(row: any): tbPet {
  return {
    id_pet: row.id_pet,
    tb_pet_nome: row.tb_pet_nome,
    tb_especie: row.tb_especie,
    id_raca: row.id_raca,
    tb_raca_nome: row.tb_raca_nome ?? row.tb_raca_nome_raca ?? row.raca ?? row.nome_raca ?? row.nomeRaca,
    tb_pet_genero: row.tb_pet_genero,
    tb_pet_status: row.tb_pet_status ?? row.tb_pet_status_pet,
    tb_pet_data_nascimento: row.tb_pet_data_nascimento,
    tb_pet_porte: row.tb_pet_porte,
    tb_pet_vacinado: row.tb_pet_vacinado,
    tb_pet_resgatado: row.tb_pet_resgatado,
    tb_data_resgate: row.tb_pet_data_resgaste,
    tb_pet_local_resgate: row.tb_pet_local_resgaste,
    tb_pet_adotado: Boolean(row.tb_pet_adotado ?? row.tb_adotado),
  } as tbPet;
}

// Map DB record -> UI Pet (for edition form)
export function mapDbPetToUi(row: any): Pet {
  return {
    id: row.id_pet,
    Nome: row.tb_pet_nome,
    Especie: row.tb_especie,
    Id_Raca: row.id_raca,
    Genero: row.tb_pet_genero,
    Porte: row.tb_pet_porte,
    Status: row.tb_pet_status ?? row.tb_pet_status_pet,
    DataNascimento: row.tb_pet_data_nascimento,
    Peso: 0, // not provided by backend schema
    Adotado: Boolean(row.tb_pet_adotado ?? row.tb_adotado),
    DataAdocao: row.tb_pet_data_adocao ?? row.tb_data_adocao,
    Vacinado: Boolean(row.tb_pet_vacinado),
    DataUltimaVacina: row.tb_pet_data_ultima_vacina,
    Resgatado: Boolean(row.tb_pet_resgatado),
    DataResgate: row.tb_pet_data_resgaste,
    LocalResgate: row.tb_pet_local_resgaste,
  } as Pet;
}

export interface FiltroPets {
  especie?: number | string;
  porte?: number | string;
  genero?: number | string;
  raca?: number | string;
  status?: number | string;
  idade?: number | string; // anos
  nome?: string;           // ILIKE no backend
}

export async function listarPets(filtros?: FiltroPets): Promise<tbPet[]> {
  const qs = new URLSearchParams();
  if (filtros) {
    for (const [k, v] of Object.entries(filtros)) {
      if (v === undefined || v === null || v === "") continue;
      qs.append(k, String(v));
    }
  }
  const url = qs.toString() ? `${PETS_BASE}?${qs.toString()}` : `${PETS_BASE}`;
  const res = await apiGet<{ data: any[] }>(url);
  return (res?.data || []).map(mapDbPetToTbPet);
}

export async function retornarPet(id_pet: number): Promise<Pet | null> {
  const res = await apiGet<{ data: any[] }>(`${PETS_BASE}/retornarPet/${id_pet}`);
  const row = res?.data?.[0];
  return row ? mapDbPetToUi(row) : null;
}

// Fotos do Pet
export async function retornarFotosPorPet(id_pet: number): Promise<string[]> {
  // Tenta rota principal e faz fallback para variações conhecidas
  const paths = [
    `/retornarFotosPorPet/${id_pet}`,
    `/foto/retornarFotosPorPet/${id_pet}`,
    `/api/retornarFotosPorPet/${id_pet}`,
  ];
  for (const p of paths) {
    try {
      const res = await apiGet<{ data: any[] }>(p);
      const arr = (res?.data || []) as any[];
      const urls = arr
        .map((r) => r?.tb_foto_pet_url_foto ?? r?.url ?? r?.foto ?? null)
        .filter((v): v is string => Boolean(v));
      if (urls.length > 0) return urls;
      // even if empty, return empty if first path succeeds without error
      if (res) return urls;
    } catch (_) {
      // tenta próximo path
    }
  }
  return [];
}

export async function criarPet(uiPet: Pet): Promise<number> {
  // Overload preserved for backward compatibility without attachment
  const payload = mapUiPetToDb(uiPet);
  const res = await apiPost<{ success: boolean; data: number }>(`${PETS_BASE}`, payload);
  return res?.data;
}

export async function atualizarPet(uiPet: Pet): Promise<void> {
  const payload = mapUiPetToDb(uiPet);
  await apiPut(`${PETS_BASE}`, payload);
}

// New overloads that accept optional attachment fields expected by backend
export async function criarPetComAnexo(
  uiPet: Pet,
  opts?: { anexo?: string | null; tb_foto_pet_url_foto?: string | null; foto?: string | null }
): Promise<number> {
  const base = mapUiPetToDb(uiPet);
  const payload = {
    ...base,
    ...(opts?.tb_foto_pet_url_foto ? { tb_foto_pet_url_foto: opts.tb_foto_pet_url_foto } : {}),
    ...(opts?.anexo ? { anexo: opts.anexo } : {}),
    ...(opts?.foto ? { foto: opts.foto } : {}),
  };
  const res = await apiPost<{ success: boolean; data: number }>(`${PETS_BASE}`, payload);
  return res?.data;
}

export async function atualizarPetComAnexo(
  uiPet: Pet,
  opts?: { anexo?: string | null; tb_foto_pet_url_foto?: string | null; foto?: string | null }
): Promise<void> {
  const base = mapUiPetToDb(uiPet);
  const payload = {
    ...base,
    ...(opts?.tb_foto_pet_url_foto ? { tb_foto_pet_url_foto: opts.tb_foto_pet_url_foto } : {}),
    ...(opts?.anexo ? { anexo: opts.anexo } : {}),
    ...(opts?.foto ? { foto: opts.foto } : {}),
  };
  await apiPut(`${PETS_BASE}`, payload);
}

export async function inativarPet(id_pet: number): Promise<void> {
  await apiPut(`${PETS_BASE}/${id_pet}`, {});
}
