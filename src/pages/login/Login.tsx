import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent
} from "react";

import { Link, useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../contexts/AuthContext";

import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });

    }

    function login(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();
        handleLogin(usuarioLogin);

    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center bg-[#070b14] text-[#f8fafc]">

                {/* FORMULÁRIO */}
                <form
                    className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}
                >

                    <h2 className="text-[#f8fafc] text-5xl font-bold">
                        Entrar
                    </h2>

                    <p className="text-[#94a3b8] text-center">
                        ✨ Acesse o Blog OLR para compartilhar ideias e experiências
                    </p>

                    {/* LOGIN */}
                    <div className="flex flex-col w-full">

                        <label
                            htmlFor="usuario"
                            className="text-[#f8fafc] font-medium mb-1"
                        >
                            Login
                        </label>

                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Digite seu login"
                            className="border border-[#e8b4c720] bg-[#0f172a] rounded-lg p-3 text-[#f8fafc] placeholder-[#94a3b8] focus:outline-none focus:border-[#c08497]"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />

                    </div>

                    {/* SENHA */}
                    <div className="flex flex-col w-full">

                        <label
                            htmlFor="senha"
                            className="text-[#f8fafc] font-medium mb-1"
                        >
                            Senha
                        </label>

                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            className="border border-[#e8b4c720] bg-[#0f172a] rounded-lg p-3 text-[#f8fafc] placeholder-[#94a3b8] focus:outline-none focus:border-[#c08497]"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />

                    </div>

                    {/* BOTÃO */}
                    <button
                        type='submit'
                        className="rounded-lg bg-[#b76e79] hover:bg-[#c08497] transition text-white w-1/2 py-3 font-semibold flex justify-center"
                    >

                        {isLoading ? (

                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            />

                        ) : (

                            <span>Entrar</span>

                        )}

                    </button>

                    <hr className="border-[#e8b4c720] w-full" />

                    <p className="text-[#94a3b8]">

                        Ainda não tem uma conta?{" "}

                        <Link
                            to="/cadastro"
                            className="text-[#e8b4c7] hover:text-[#fff7f8] font-semibold"
                        >
                            Cadastre-se
                        </Link>

                    </p>

                </form>

                {/* IMAGEM */}
                <div
                    className="lg:block hidden bg-no-repeat
                               w-full min-h-screen bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop')"
                    }}
                ></div>

            </div>
        </>
    );
}

export default Login;