import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

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
                    'Authorization': `Bearer ${token}`
                }
            });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.toString().includes('401')) {

                handleLogout();

            }
        }
    }

    useEffect(() => {

        if (token === '') {

            alert('Você precisa estar logado');

            navigate('/');

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
                    'Authorization': `Bearer ${token}`
                }
            });

            alert('Postagem apagada com sucesso');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.toString().includes('401')) {

                handleLogout();

            } else {

                alert('Erro ao deletar a postagem.');

            }
        }

        setIsLoading(false);

        retornar();
    }

    function retornar() {

        navigate("/postagens");

    }

    return (

        <div className='min-h-screen bg-gray-700 flex items-center justify-center'>

            <div className='container w-1/3 mx-auto'>

                <h1 className='text-4xl text-center my-4 text-white font-bold'>

                    Deletar Postagem

                </h1>

                <p className='text-center font-semibold mb-4 text-white'>

                    Você tem certeza de que deseja apagar a postagem a seguir?

                </p>

                <div className='border border-black flex flex-col 
                                rounded-2xl overflow-hidden justify-between'>

                    <header
                        className='py-2 px-6 bg-purple-900 
                                   text-white font-bold text-2xl'
                    >

                        Postagem

                    </header>

                    <div className="p-4 bg-slate-200">

                        <p className='text-lg font-semibold uppercase'>

                            {postagem.titulo}

                        </p>

                        <p>

                            {postagem.texto}

                        </p>

                    </div>

                    <div className="flex">

                        <button
                            className='text-white bg-purple-900 
                                       hover:bg-purple-800 w-full py-2
                                       border-r border-black transition-all'
                            onClick={retornar}
                        >

                            Não

                        </button>

                        <button
                            className='w-full text-white bg-purple-900
                                       hover:bg-purple-800 flex items-center
                                       justify-center transition-all'
                            onClick={deletarPostagem}
                        >

                            {isLoading ?

                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />

                                :

                                <span>Sim</span>

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default DeletarPostagem