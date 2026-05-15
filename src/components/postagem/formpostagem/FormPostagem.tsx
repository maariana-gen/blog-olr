import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";

import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormPostagem() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [temas, setTemas] = useState<Tema[]>([]);

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPostagemPorId(id: string) {

        try {

            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.toString().includes("401")) {

                handleLogout();

            }

        }
    }

    async function buscarTemas() {

        try {

            await buscar("/temas", setTemas, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.toString().includes("401")) {

                handleLogout();

            }

        }
    }

    useEffect(() => {

        if (token === "") {

            navigate("/");

        }

    }, [token, navigate]);

    useEffect(() => {

        buscarTemas();

        if (id !== undefined) {

            buscarPostagemPorId(id);

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            usuario: usuario,
        });
    }

    function retornar() {

        navigate("/postagens");

    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        setIsLoading(true);

        if (id !== undefined) {

            try {

                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                ToastAlerta("Postagem atualizada com sucesso", "sucesso");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {

                if (error.toString().includes("401")) {

                    handleLogout();

                } else {

                    ToastAlerta("Erro ao atualizar a postagem", "erro");

                }
            }

        } else {

            try {

                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                ToastAlerta("Postagem cadastrada com sucesso", "sucesso");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {

                if (error.toString().includes("401")) {

                    handleLogout();

                } else {

                    ToastAlerta("Erro ao cadastrar a postagem", "erro");

                }
            }
        }

        setIsLoading(false);

        retornar();
    }

    return (

        <div className="min-h-screen bg-[#070b14] flex flex-col items-center px-4 py-10">

            <h1 className="text-4xl text-center mb-8 text-[#f8fafc] font-bold">

                {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}

            </h1>

            <form
                className="flex flex-col w-full max-w-2xl gap-5 bg-[#1e293b]
                           p-8 rounded-4xl shadow-2xl
                           border border-[#e8b4c710]"
                onSubmit={gerarNovaPostagem}
            >

                {/* TÍTULO */}
                <div className="flex flex-col gap-2">

                    <label
                        htmlFor="titulo"
                        className="font-semibold text-[#f8fafc]"
                    >
                        Título da Postagem
                    </label>

                    <input
                        type="text"
                        placeholder="Digite o título"
                        name="titulo"
                        required
                        className="border border-[#e8b4c720]
                                   bg-[#0f172a]
                                   text-[#f8fafc]
                                   placeholder-[#94a3b8]
                                   rounded-lg p-3
                                   focus:outline-none
                                   focus:border-[#c08497]"
                        value={postagem.titulo || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />

                </div>

                {/* TEXTO */}
                <div className="flex flex-col gap-2">

                    <label
                        htmlFor="texto"
                        className="font-semibold text-[#f8fafc]"
                    >
                        Texto da Postagem
                    </label>

                    <input
                        type="text"
                        placeholder="Compartilhe sua ideia..."
                        name="texto"
                        required
                        className="border border-[#e8b4c720]
                                   bg-[#0f172a]
                                   text-[#f8fafc]
                                   placeholder-[#94a3b8]
                                   rounded-lg p-3
                                   focus:outline-none
                                   focus:border-[#c08497]"
                        value={postagem.texto || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />

                </div>

                {/* TEMA */}
                <div className="flex flex-col gap-2">

                    <p className="font-semibold text-[#f8fafc]">

                        Tema da Postagem

                    </p>

                    <select
                        name="tema"
                        id="tema"
                        className="border border-[#e8b4c720]
                                   bg-[#0f172a]
                                   text-[#f8fafc]
                                   p-3 rounded-lg
                                   focus:outline-none
                                   focus:border-[#c08497]"
                        onChange={(e) =>

                            setPostagem({
                                ...postagem,
                                tema: {
                                    id: Number(e.currentTarget.value),
                                    descricao: ""
                                }
                            })

                        }
                    >

                        <option value="" disabled selected>

                            Selecione um tema

                        </option>

                        {temas.map((tema) => (

                            <option key={tema.id} value={tema.id}>

                                {tema.descricao}

                            </option>

                        ))}

                    </select>

                </div>

                {/* BOTÃO */}
                <button
                    type="submit"
                    className="rounded-lg bg-[#b76e79]
                               hover:bg-[#c08497]
                               text-[#f8fafc]
                               font-bold w-1/2 mx-auto
                               py-3 flex justify-center
                               transition-all"
                >

                    {isLoading ?

                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        />

                        :

                        <span>

                            {id === undefined ? "Cadastrar" : "Atualizar"}

                        </span>

                    }

                </button>

            </form>

        </div>
    );
}

export default FormPostagem;