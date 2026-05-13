import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
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

            if (error.toString().includes('401')) {

                handleLogout();

            }

        }
    }

    async function buscarTemas() {

        try {

            await buscar('/temas', setTemas, {
                headers: {
                    Authorization: `Bearer ${token}`
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

            navigate('/');

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

        navigate('/postagens');

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

                alert('Postagem atualizada com sucesso');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {

                if (error.toString().includes('401')) {

                    handleLogout();

                } else {

                    alert('Erro ao atualizar a Postagem');

                }
            }

        } else {

            try {

                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                alert('Postagem cadastrada com sucesso');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {

                if (error.toString().includes('401')) {

                    handleLogout();

                } else {

                    alert('Erro ao cadastrar a Postagem');

                }
            }
        }

        setIsLoading(false);

        retornar();
    }

    return (

        <div className="min-h-screen bg-gray-700 flex flex-col items-center">

            <h1 className="text-4xl text-center my-8 text-white font-bold">

                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}

            </h1>

            <form
                className="flex flex-col w-1/2 gap-4 bg-slate-200 
                           p-8 rounded-2xl shadow-lg border border-black"
                onSubmit={gerarNovaPostagem}
            >

                <div className="flex flex-col gap-2">

                    <label
                        htmlFor="titulo"
                        className="font-semibold text-purple-900"
                    >
                        Título da Postagem
                    </label>

                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-purple-900 
                                   rounded p-2 focus:outline-none 
                                   focus:ring-2 focus:ring-purple-700"
                        value={postagem.titulo || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />

                </div>

                <div className="flex flex-col gap-2">

                    <label
                        htmlFor="texto"
                        className="font-semibold text-purple-900"
                    >
                        Texto da Postagem
                    </label>

                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-purple-900 
                                   rounded p-2 focus:outline-none 
                                   focus:ring-2 focus:ring-purple-700"
                        value={postagem.texto || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />

                </div>

                <div className="flex flex-col gap-2">

                    <p className="font-semibold text-purple-900">

                        Tema da Postagem

                    </p>

                    <select
                        name="tema"
                        id="tema"
                        className='border-2 border-purple-900 
                                   p-2 rounded focus:outline-none 
                                   focus:ring-2 focus:ring-purple-700'
                        onChange={(e) =>

                            setPostagem({
                                ...postagem,
                                tema: {
                                    id: Number(e.currentTarget.value),
                                    descricao: ''
                                }
                            })

                        }
                    >

                        <option value="" disabled selected>

                            Selecione um Tema

                        </option>

                        {temas.map((tema) => (

                            <option key={tema.id} value={tema.id}>

                                {tema.descricao}

                            </option>

                        ))}

                    </select>

                </div>

                <button
                    type='submit'
                    className='rounded bg-purple-900 hover:bg-purple-800
                               text-white font-bold w-1/2 mx-auto 
                               py-2 flex justify-center transition-all'
                >

                    {isLoading ?

                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        />

                        :

                        <span>

                            {id === undefined ? 'Cadastrar' : 'Atualizar'}

                        </span>

                    }

                </button>

            </form>

        </div>
    );
}

export default FormPostagem;