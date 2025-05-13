import HelloWorld from "../components/HelloWorld";
import './page.css';

export default function Page() {
  return (
    <div className="informacao">
      <div className="mensagem">
        <h2>Oi, Bem vindo de volta!</h2>
        <p>Você está em uma boa companhia</p>
      </div>

      <div className="login-direito">
        <div className="login-conteudo">
          <h1>Entrar</h1>
          <p>Novo Usuário? <a href="#">Crie uma conta</a></p>

          <form id="login-email">
            <label htmlFor="email">Entre com seu e-mail</label>
            <input type="email" id="email" required />
            <input type="password" id="senha" required />
            <div className="opcoes">
              <label>
                <input type="checkbox" id="esquece" /> Lembre de mim
              </label>
              <a href="#" className="esqueceu">Esqueceu a senha?</a>
            </div>

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}