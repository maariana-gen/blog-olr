import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

import type Tema from "../../../models/Tema";

import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {

        try {

            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.toString().includes("403")) {
                handleLogout();
            }

        }
    }

    useEffect(() => {

        if (token === "") {

            ToastAlerta("Você precisa estar logado", "info")

            navigate("/");

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {

        if (id !== undefined) {

            buscarPorId(id);

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

        setTema({
            ...tema,
            [e.target.name]: e.target.value
        });

    }

    function retornar() {

        navigate("/temas");

    }

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        setIsLoading(true);

        if (id !== undefined) {

            try {

                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                ToastAlerta("Tema atualizado com sucesso!", "sucesso");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {

                if (error.toString().includes("401")) {

                    handleLogout();

                } else {

                    ToastAlerta("Erro ao atualizar o tema.", "erro");

                }
            }

        } else {

            try {

                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                ToastAlerta("Tema cadastrado com sucesso!", "sucesso");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {

                if (error.toString().includes("401")) {

                    handleLogout();

                } else {

                    ToastAlerta("Erro ao cadastrar o tema.", "erro");

                }
            }
        }

        setIsLoading(false);

        retornar();

    }

    return (

        <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center px-4">

            <h1 className="text-4xl text-center mb-8 text-[#f8fafc] font-bold">

                {id === undefined ? "Cadastrar Tema" : "Editar Tema"}

            </h1>

            <form
                className="w-full max-w-2xl flex flex-col gap-5
                           bg-[#1e293b]
                           p-8 rounded-4xl
                           border border-[#e8b4c710]
                           shadow-2xl"
                onSubmit={gerarNovoTema}
            >

                {/* INPUT */}
                <div className="flex flex-col gap-2">

                    <label
                        htmlFor="descricao"
                        className="text-[#f8fafc] font-semibold"
                    >
                        Descrição do Tema
                    </label>

                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name="descricao"
                        className="border border-[#e8b4c720]
                                   rounded-lg p-3
                                   bg-[#0f172a]
                                   text-[#f8fafc]
                                   placeholder:text-[#94a3b8]
                                   focus:outline-none
                                   focus:border-[#c08497]"

                        value={tema.descricao}

                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />

                </div>

                {/* BOTÃO */}
                <button
                    className="rounded-lg text-[#f8fafc]
                               bg-[#b76e79]
                               hover:bg-[#c08497]
                               w-1/2 py-3 mx-auto
                               flex justify-center items-center
                               font-semibold transition-all"
                    type="submit"
                >

                    {isLoading ? (

                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        />

                    ) : (

                        <span>
                            {id === undefined ? "Cadastrar" : "Atualizar"}
                        </span>

                    )}

                </button>

            </form>

        </div>
    );
}

export default FormTema;