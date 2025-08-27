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

  const [pets, setPets] = useState<Pet[]>(
    petsCache
      ? (JSON.parse(petsCache) as Pet[])
      : [
          {
            id: 1,
            Nome: "Bela",
            Especie: enumEspecie.GATO,
            Genero: enumGenero.FEMININO,
            Status: enumStatus.DISPONIVEL,
            Id_Raca: 1,
            Peso: 3.5,
            Adotado: true,
            Vacinado: false,
            TutorResponsavel: "Ana",
            Resgatado: false,
            LocalResgate: "N/A",
            DataNascimento: "05/02/2018",
          },
          {
            id: 2,
            Nome: "Rufus",
            Especie: enumEspecie.CACHORRO,
            Genero: enumGenero.MASCULINO,
            Status: enumStatus.ADOTADO,
            Id_Raca: 2,
            Peso: 25,
            Adotado: true,
            Vacinado: true,
            TutorResponsavel: "Carlos",
            Resgatado: true,
            LocalResgate: "Rua",
            DataNascimento: "22/09/2015",
          },
          {
            id: 3,
            Nome: "Sansão",
            Especie: enumEspecie.CACHORRO,
            Genero: enumGenero.MASCULINO,
            Status: enumStatus.DISPONIVEL,
            Id_Raca: 3,
            Peso: 15,
            Adotado: false,
            Vacinado: false,
            TutorResponsavel: "João",
            Resgatado: false,
            LocalResgate: "N/A",
            DataNascimento: "13/11/2021",
          },
          {
            id: 4,
            Nome: "Lua",
            Especie: enumEspecie.GATO,
            Genero: enumGenero.FEMININO,
            Status: enumStatus.DISPONIVEL,
            Id_Raca: 4,
            Peso: 3,
            Adotado: false,
            Vacinado: false,
            TutorResponsavel: "Mariana",
            Resgatado: false,
            LocalResgate: "N/A",
            DataNascimento: "14/05/2020",
          },
          {
            id: 5,
            Nome: "Branca",
            Especie: enumEspecie.CACHORRO,
            Genero: enumGenero.FEMININO,
            Status: enumStatus.DISPONIVEL,
            Id_Raca: 1,
            Peso: 5,
            Adotado: false,
            Vacinado: false,
            TutorResponsavel: "Fernanda",
            Resgatado: true,
            LocalResgate: "Avenida",
            DataNascimento: "05/02/2018",
          },
          {
            id: 6,
            Nome: "Max",
            Especie: enumEspecie.CACHORRO,
            Genero: enumGenero.MASCULINO,
            Status: enumStatus.DISPONIVEL,
            Id_Raca: 2,
            Peso: 30,
            Adotado: false,
            Vacinado: true,
            TutorResponsavel: "Lucas",
            Resgatado: false,
            LocalResgate: "N/A",
            DataNascimento: "08/06/2020",
          },
          {
            id: 7,
            Nome: "Mia",
            Especie: enumEspecie.GATO,
            Genero: enumGenero.FEMININO,
            Status: enumStatus.DISPONIVEL,
            Id_Raca: 3,
            Peso: 4,
            Adotado: false,
            Vacinado: false,
            TutorResponsavel: "Roberta",
            Resgatado: false,
            LocalResgate: "N/A",
            DataNascimento: "11/01/2019",
          },
          {
            id: 8,
            Nome: "Rex",
            Especie: enumEspecie.CACHORRO,
            Genero: enumGenero.MASCULINO,
            Status: enumStatus.ADOTADO,
            Id_Raca: 4,
            Peso: 40,
            Adotado: true,
            Vacinado: true,
            TutorResponsavel: "Carlos",
            Resgatado: true,
            LocalResgate: "Praça",
            DataNascimento: "07/12/2017",
          },
          {
            id: 9,
            Nome: "Nina",
            Especie: enumEspecie.GATO,
            Genero: enumGenero.FEMININO,
            Status: enumStatus.DISPONIVEL,
            Id_Raca: 1,
            Peso: 3,
            Adotado: false,
            Vacinado: false,
            TutorResponsavel: "Julia",
            Resgatado: false,
            LocalResgate: "N/A",
            DataNascimento: "23/04/2021",
          },
          {
            id: 10,
            Nome: "Charlie",
            Especie: enumEspecie.CACHORRO,
            Genero: enumGenero.MASCULINO,
            Status: enumStatus.DISPONIVEL,
            Id_Raca: 2,
            Peso: 20,
            Adotado: false,
            Vacinado: true,
            TutorResponsavel: "Roberto",
            Resgatado: false,
            LocalResgate: "N/A",
            DataNascimento: "01/09/2018",
          },
        ]
  );

  const [racas, setRacas] = useState<Raca[]>(
    racasCache
      ? (JSON.parse(racasCache) as Raca[])
      : [
          {
            id: 1,
            Especie: enumEspecie.CACHORRO,
            Nome: "Bulldog",
          },
          {
            id: 2,
            Especie: enumEspecie.GATO,
            Nome: "Persa",
          },
          {
            id: 3,
            Especie: enumEspecie.CACHORRO,
            Nome: "Cocker",
          },
          {
            id: 4,
            Especie: enumEspecie.GATO,
            Nome: "Siamês",
          },
        ]
  );

  const [vacinas, setVacinas] = useState<Vacina[]>(
    vacinasCache
      ? (JSON.parse(vacinasCache) as Vacina[])
      : [
          {
            id: 1,
            Nome: "Antirrábica",
            DataVacina: "2024-01-15",
          },
          {
            id: 2,
            Nome: "V8",
            DataVacina: "2024-03-10",
          },
          {
            id: 3,
            Nome: "Gripe Canina",
            DataVacina: "2024-02-25",
          },
          {
            id: 4,
            Nome: "Leptospirose",
            DataVacina: "2024-04-05",
          },
        ]
  );

  const [doencas, setDoencas] = useState<Doenca[]>(
    doencasCache
      ? (JSON.parse(doencasCache) as Doenca[])
      : [
          {
            id: 1,
            Nome: "Raiva",
            Descricao:
              "Doença viral grave que afeta o sistema nervoso central dos animais e humanos.",
          },
          {
            id: 2,
            Nome: "Leptospirose",
            Descricao:
              "Infecção bacteriana transmitida pela urina de animais infectados.",
          },
          {
            id: 3,
            Nome: "Cinomose",
            Descricao:
              "Doença viral contagiosa que afeta cães, causando sintomas respiratórios e neurológicos.",
          },
          {
            id: 4,
            Nome: "Parvovirose",
            Descricao:
              "Doença viral altamente contagiosa que afeta cães jovens, causando vômitos e diarreia grave.",
          },
        ]
  );

  const [visitas, setVisitas] = useState<Visita[]>(
    visitasCache
      ? (JSON.parse(visitasCache) as Visita[])
      : [
          {
            id: 1,
            Id_Usuario: 1,
            Id_Pet: 1,
            Data: "2024-05-10T10:00:00Z",
            Status: enumStatus.DISPONIVEL,
            Observacoes: "Consulta de rotina",
          },
          {
            id: 2,
            Id_Usuario: 1,
            Id_Pet: 2,
            Data: "2024-04-20T15:30:00Z",
            Status: enumStatus.DISPONIVEL,
            Observacoes: "Vacinação anual",
          },
          {
            id: 3,
            Id_Usuario: 2,
            Id_Pet: 3,
            Data: "2024-04-25T09:00:00Z",
            Status: enumStatus.DISPONIVEL,
            Observacoes: "Cliente reagendou",
          },
        ]
  );

  useEffect(() => {
    console.log("pets", pets);
    localStorage.setItem("pets", JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    console.log("racas", racas);
    localStorage.setItem("racas", JSON.stringify(racas));
  }, [racas]);

  useEffect(() => {
    console.log("vacinas", vacinas);
    localStorage.setItem("vacinas", JSON.stringify(vacinas));
  }, [vacinas]);

  useEffect(() => {
    console.log("doencas", doencas);
    localStorage.setItem("doencas", JSON.stringify(doencas));
  }, [doencas]);

  useEffect(() => {
    console.log("visitas", visitas);
    localStorage.setItem("visitas", JSON.stringify(visitas));
  }, [visitas]);

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
