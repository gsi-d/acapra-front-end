import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton } from '@mui/material';

export default function Footer() {
  return (
    <div className="bottom-0 w-full flex flex-col mb-0 items-center justify-center bg-violet-300 gap-2" style={{ height: '20vh' }}>
        <div className='flex flex-row space-x-4'>
            <IconButton><WhatsAppIcon fontSize="large" className='text-violet-800'/></IconButton>
            <IconButton><FacebookIcon fontSize="large" className='text-violet-800'/></IconButton>
            <IconButton><InstagramIcon fontSize="large" className='text-violet-800'/></IconButton>
            <IconButton><MailIcon fontSize="large" className='text-violet-800'/></IconButton>
        </div>
      <p className="text-violet-800">Entre em contato conosco em nossas redes sociais</p>
      <p className="text-violet-800">Políticas de privacidade | Termos de uso</p>
      <p className="text-violet-800">© 2025 ACAPRA / Grupo 54 Curricularização. Todos os direitos reservados</p>
    </div>
  );
}
