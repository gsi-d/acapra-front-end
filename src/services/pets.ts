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
    tb_pet_status_pet: payload.Status,
    tb_pet_data_nascimento: payload.DataNascimento,
    tb_pet_vacinado: payload.Vacinado,
    tb_pet_resgatado: payload.Resgatado,
    tb_pet_data_resgaste: payload.DataResgate,
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
    tb_pet_genero: row.tb_pet_genero,
    tb_pet_status: row.tb_pet_status ?? row.tb_pet_status_pet,
    tb_pet_data_nascimento: row.tb_pet_data_nascimento,
    tb_pet_porte: row.tb_pet_porte,
    tb_pet_vacinado: row.tb_pet_vacinado,
    tb_pet_tutor_responsavel: row.tb_pet_tutor_responsavel,
    tb_pet_resgatado: row.tb_pet_resgatado,
    tb_data_resgate: row.tb_pet_data_resgaste,
    tb_pet_local_resgate: row.tb_pet_local_resgaste,
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
    Status: row.tb_pet_status ?? row.tb_pet_status_pet,
    DataNascimento: row.tb_pet_data_nascimento,
    Peso: 0, // not provided by backend schema
    Adotado: Boolean(row.tb_pet_adotado),
    DataAdocao: row.tb_pet_data_adocao,
    Vacinado: Boolean(row.tb_pet_vacinado),
    DataUltimaVacina: row.tb_pet_data_ultima_vacina,
    TutorResponsavel: row.tb_pet_tutor_responsavel,
    Resgatado: Boolean(row.tb_pet_resgatado),
    DataResgate: row.tb_pet_data_resgaste,
    LocalResgate: row.tb_pet_local_resgaste,
  } as Pet;
}

export async function listarPets(): Promise<tbPet[]> {
  const res = await apiGet<{ data: any[] }>(`${PETS_BASE}`);
  return (res?.data || []).map(mapDbPetToTbPet);
}

export async function retornarPet(id_pet: number): Promise<Pet | null> {
  const res = await apiGet<{ data: any[] }>(`${PETS_BASE}/retornarPet/${id_pet}`);
  const row = res?.data?.[0];
  return row ? mapDbPetToUi(row) : null;
}

export async function criarPet(uiPet: Pet): Promise<number> {
  const payload = mapUiPetToDb(uiPet);
  const res = await apiPost<{ success: boolean; data: number }>(`${PETS_BASE}`, payload);
  return res?.data;
}

export async function atualizarPet(uiPet: Pet): Promise<void> {
  const payload = mapUiPetToDb(uiPet);
  await apiPut(`${PETS_BASE}`, payload);
}

export async function inativarPet(id_pet: number): Promise<void> {
  await apiPut(`${PETS_BASE}/${id_pet}`, {});
}
