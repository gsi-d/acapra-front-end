'use client';
import './page.css';
import { IconButton, OutlinedInput, InputAdornment, InputLabel, FormControl } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Alerta, { AlertaParams } from './components/Alerta';
import { login as apiLogin } from '@/services/auth';
import { useSessao } from '@/contextos/ContextoSessao';

export default function Page() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembreDeMim, setLembreDeMim] = useState(false);
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [alertaParams, setAlertaParams] = useState<AlertaParams>({ mensagem: '', severity: 'error' });
  const router = useRouter();
  const { sessao, setSessao } = useSessao();

  useEffect(() => {
    if (sessao.emailSalvo) {
      setEmail(sessao.emailSalvo);
      setLembreDeMim(true);
    }
    if (sessao.logado) {
      router.push('/geral/catalogo');
    }
  }, [router, sessao.emailSalvo, sessao.logado]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    try {
      const res = await apiLogin(email, senha);
      if (!res?.success || !res?.data) {
        throw new Error(res?.message || 'Credenciais inválidas.');
      }
      const adminFlag = Boolean((res.data as any).tb_usuario_admin ?? (res.data as any).admin ?? false);
      setSessao({
        isAdm: adminFlag,
        logado: true,
        emailSalvo: lembreDeMim ? email : null,
      });

      router.push('/geral/catalogo');
    } catch (err: any) {
      const msg = err?.message || 'Não foi possível realizar o login.';
      setAlertaParams({ mensagem: msg, severity: 'error' });
      setAlertaOpen(true);
    }
  }

  return (
    <div className="informacao">
      <Alerta open={alertaOpen} setAlertaOpen={setAlertaOpen} params={alertaParams} />
      <div className="mensagem">
        <h2>Oi, Bem-vindo de volta!</h2>
        <p>Você está em uma boa companhia</p>
      </div>

      <div className="login-direito">
        <div className="login-conteudo">
          <h1>Entrar</h1>
          <p>Novo usuário? <a href="#">Crie uma conta</a></p>

          <form id="login-email" onSubmit={handleLogin}>
            <label htmlFor="email">Entre com seu e-mail</label>
            <input
              type="email"
              id="email"
              required
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="senha">Digite sua senha</label>
            <FormControl variant="outlined" fullWidth className="senha-field">
              <OutlinedInput
                id="senha"
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      edge="end"
                      aria-label="Mostrar/ocultar senha"
                    >
                      {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <div className="opcoes">
              <label>
                <input
                  type="checkbox"
                  id="lembreDeMim"
                  checked={lembreDeMim}
                  onChange={(e) => setLembreDeMim(e.target.checked)}
                />
                Lembre de mim
              </label>
              <a href="#" className="esqueceu">Esqueceu a senha?</a>
            </div>

            <button type="submit">Entrar</button>
          </form>

          <div className="linha-ou">
            <span className="linha"></span>
            <span className="ou">OU</span>
            <span className="linha"></span>
          </div>

          <div className="icones-sociais">
            <a href="https://accounts.google.com" target="_blank" rel="noopener noreferrer">
              <IconButton><GoogleIcon className="social-icon google" /></IconButton>
            </a>
            <a href="https://www.facebook.com/moacir.da.acapra.giraldi" target="_blank" rel="noopener noreferrer">
              <IconButton><FacebookIcon className="social-icon facebook" /></IconButton>
            </a>
            <a href="https://www.instagram.com/acaprabrusquesc/" target="_blank" rel="noopener noreferrer">
              <IconButton><InstagramIcon className="social-icon instagram" /></IconButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
