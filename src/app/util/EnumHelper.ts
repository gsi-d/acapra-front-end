export function converteNumberParaEnum<T extends Record<string, string | number>>(
  valor: number,
  enumTipo: T
): T[keyof T] | undefined {
  // Verifica se o valor existe no enum
  if (Object.values(enumTipo).includes(valor)) {
    return valor as T[keyof T];
  }
  return undefined;
}