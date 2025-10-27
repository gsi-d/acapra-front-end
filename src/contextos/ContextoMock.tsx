"use client";
import Alerta, { AlertaParams } from "@/app/components/Alerta";
import {
  Doenca,
  enumEspecie,
  enumGenero,
  enumStatus,
  Pet,
  Raca,
  Vacina,
  Visita,
} from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface InterfaceProviderProps {
  children: ReactNode;
}

const ContextoMock = createContext<{
  pets: Pet[];
  setPets: (params: Pet[]) => void;
  racas: Raca[];
  setRacas: (params: Raca[]) => void;
  vacinas: Vacina[];
  setVacinas: (params: Vacina[]) => void;
  doencas: Doenca[];
  setDoencas: (params: Doenca[]) => void;
  visitas: Visita[];
  setVisitas: (params: Visita[]) => void;
  openAlerta: (params: AlertaParams) => void;
}>({
  pets: [],
  setPets: () => {},
  racas: [],
  setRacas: () => {},
  vacinas: [],
  setVacinas: () => {},
  doencas: [],
  setDoencas: () => {},
  visitas: [],
  setVisitas: () => {},
  openAlerta: () => {},
});

export const useContextoMock = () => useContext(ContextoMock);

export const ContextoMockProvider: React.FC<InterfaceProviderProps> = ({
  children,
}) => {
  const [alertaOpen, setAlertaOpen] = useState<boolean>(false);
  const [alertaProps, setAlertaProps] = useState<AlertaParams>({
    mensagem: "",
    severity: "info",
  });
  const petsCache = '';
  const racasCache = '';
  const vacinasCache = '';
  const doencasCache = '';
  const visitasCache = '';

  const [pets, setPets] = useState<Pet[]>(petsCache ? (JSON.parse(petsCache) as Pet[]) : []);

  const [racas, setRacas] = useState<Raca[]>(racasCache ? (JSON.parse(racasCache) as Raca[]) : []);

  const [vacinas, setVacinas] = useState<Vacina[]>(vacinasCache ? (JSON.parse(vacinasCache) as Vacina[]) : []);

  const [doencas, setDoencas] = useState<Doenca[]>(doencasCache ? (JSON.parse(doencasCache) as Doenca[]) : []);

  const [visitas, setVisitas] = useState<Visita[]>(visitasCache ? (JSON.parse(visitasCache) as Visita[]) : []);

  

  function openAlerta(params: AlertaParams) {
    setAlertaOpen(true);
    setAlertaProps(params);
  }

  return (
    <ContextoMock.Provider
      value={{
        pets,
        setPets,
        racas,
        setRacas,
        vacinas,
        setVacinas,
        doencas,
        setDoencas,
        visitas,
        setVisitas,
        openAlerta
      }}
    >
      <Alerta
        open={alertaOpen}
        params={alertaProps}
        setAlertaOpen={setAlertaOpen}
      />
      {children}
    </ContextoMock.Provider>
  );
};

