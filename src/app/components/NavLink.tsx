'use client';

import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PetsIcon from '@mui/icons-material/Pets';
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  minimized?: boolean;
}

// Map of links to display in the side navigation.
const links = [
  {
    name: "Cadastrar raça",
    href: "/administracao/cadastroRaca",
    icon: BookmarkAddIcon,
  },
  { name: "Cadastrar vacina", href: "/administracao/cadastroVacina", icon: VaccinesIcon },
  { name: "Cadastrar doença", href: "/administracao/cadastroDoenca", icon: CoronavirusIcon },
  { name: "Agenda visita", href: "/administracao/agendarVisita", icon: CalendarMonthIcon },
  { name: "Atualizar informações", href: "/geral/atualizarInfos", icon: ManageHistoryIcon },
  { name: "Cadastrar pet", href: "/geral/cadastroPet", icon: PlaylistAddIcon },
  { name: "Catálogo", href: "/geral/catalogo", icon: FormatListBulletedIcon },
  { name: "Adoção", href: "/geral/adocao", icon: PetsIcon },
];

export default function NavLinks({ minimized = false }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <>
      {!minimized && (
      <h3 className="px-3 py-2 text-gray-400">ADMINISTRAÇÃO</h3>
      )}
      {links.slice(0, 5).map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-purple-0 p-3 text-sm font-medium text-gray-400 hover:bg-purple-100 hover:text-purple-800 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-purple-200 text-purple-800": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            {!minimized && (
          <p className="hidden md:block">
            {link.name}
          </p>
        )}
          </Link>
        );
      })}
      {!minimized && (
      <h3 className="px-3 py-2 text-gray-400">GERAL</h3>
      )}
      {links.slice(5).map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium text-gray-400 hover:bg-purple-100 hover:text-purple-800 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-purple-300 text-purple-800": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            {!minimized && (
          <p className="hidden md:block">
            {link.name}
          </p>
        )}
          </Link>
        );
      })}
    </>
  );
}
