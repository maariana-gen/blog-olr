import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  function retornar() {
    navigate("/");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      }
    } else {
      ToastAlerta("Dados do usuário inconsistentes!", "erro");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center bg-[#070b14] font-bold">
        
        <div
          className="bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
        ></div>

        <form
          className="flex justify-center items-center flex-col w-2/3 gap-3"
          onSubmit={cadastrarNovoUsuario}
        >
          <span className="text-[#e8b4c7] font-semibold">
            ✨ Crie sua conta
          </span>

          <h2 className="text-[#f8fafc] text-5xl font-bold">
            Cadastrar
          </h2>

          <p className="text-[#94a3b8] text-center font-normal">
            Entre para o Blog OLR e compartilhe suas ideias.
          </p>

          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="text-[#f8fafc] mb-1">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              className="border border-[#e8b4c720] bg-[#0f172a] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg p-2 focus:outline-none focus:border-[#c08497]"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-[#f8fafc] mb-1">
              Login
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Digite seu login"
              className="border border-[#e8b4c720] bg-[#0f172a] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg p-2 focus:outline-none focus:border-[#c08497]"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="text-[#f8fafc] mb-1">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Cole o link da sua foto"
              className="border border-[#e8b4c720] bg-[#0f172a] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg p-2 focus:outline-none focus:border-[#c08497]"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="text-[#f8fafc] mb-1">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              className="border border-[#e8b4c720] bg-[#0f172a] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg p-2 focus:outline-none focus:border-[#c08497]"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha" className="text-[#f8fafc] mb-1">
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              className="border border-[#e8b4c720] bg-[#0f172a] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg p-2 focus:outline-none focus:border-[#c08497]"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>

          <div className="flex justify-around w-full gap-8 mt-2">
            <button
              type="reset"
              className="rounded-lg text-[#f8fafc] border border-[#e8b4c740] hover:bg-[#1e293b] w-1/2 py-2 transition"
              onClick={retornar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg text-[#f8fafc] bg-[#b76e79] hover:bg-[#c08497] w-1/2 py-2 flex justify-center transition"
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;