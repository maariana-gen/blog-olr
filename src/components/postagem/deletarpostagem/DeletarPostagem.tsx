import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";

function DeletarPostagem() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    async function buscarPorId(id: string) {

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

    useEffect(() => {

        if (token === "") {

            ToastAlerta("Você precisa estar logado", "info");

            navigate("/");

        }

    }, [token, navigate]);

    useEffect(() => {

        if (id !== undefined) {
            buscarPorId(id);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function deletarPostagem() {

        setIsLoading(true);

        try {

            await deletar(`/postagens/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            ToastAlerta("Postagem apagada com sucesso", "sucesso");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.toString().includes("401")) {

                handleLogout();

            } else {

                ToastAlerta("Erro ao deletar a postagem.", "erro");

            }
        }

        setIsLoading(false);

        retornar();
    }

    function retornar() {
        navigate("/postagens");
    }

    return (

        <div className="min-h-screen bg-[#070b14] flex items-center justify-center px-4">

            <div className="container w-full max-w-md mx-auto">

                <h1 className="text-4xl text-center my-4 text-[#f8fafc] font-bold">
                    Deletar Postagem
                </h1>

                <p className="text-center font-semibold mb-4 text-[#94a3b8]">
                    Você tem certeza de que deseja apagar esta postagem?
                </p>

                <div className="border border-[#e8b4c710] bg-[#1e293b] flex flex-col rounded-3xl overflow-hidden justify-between shadow-xl">

                    <header className="py-3 px-6 bg-[#0f172a] text-[#e8b4c7] font-bold text-2xl border-b border-[#e8b4c710]">
                        Postagem
                    </header>

                    <div className="p-5 flex flex-col gap-3">

                        <p className="text-xl font-semibold text-[#f8fafc]">
                            {postagem.titulo}
                        </p>

                        <p className="text-[#94a3b8] leading-relaxed">
                            {postagem.texto}
                        </p>

                    </div>

                    <div className="flex border-t border-[#e8b4c710]">

                        <button
                            className="w-full text-[#f8fafc] bg-[#0f172a] hover:bg-[#c08497] py-3 transition-all"
                            onClick={retornar}
                        >
                            Não
                        </button>

                        <div className="w-px bg-[#e8b4c710]" />

                        <button
                            className="w-full text-[#f8fafc] bg-[#0f172a] hover:bg-[#c08497] flex items-center justify-center py-3 transition-all"
                            onClick={deletarPostagem}
                        >

                            {isLoading ? (

                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />

                            ) : (

                                <span>Sim</span>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default DeletarPostagem;