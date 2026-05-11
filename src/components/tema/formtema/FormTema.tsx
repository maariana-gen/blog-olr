import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
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

            if (error.toString().includes('403')) {
                handleLogout();
            }

        }
    }

    useEffect(() => {

        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
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

                alert('O Tema foi atualizado com sucesso!');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {

                if (error.toString().includes('401')) {

                    handleLogout();

                } else {

                    alert('Erro ao atualizar o tema.');

                }
            }

        } else {

            try {

                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                alert('O Tema foi cadastrado com sucesso!');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {

                if (error.toString().includes('401')) {

                    handleLogout();

                } else {

                    alert('Erro ao cadastrar o tema.');

                }
            }
        }

        setIsLoading(false);

        retornar();

    }

    return (

        <div className="container flex flex-col items-center justify-center 
                        mx-auto min-h-screen bg-gray-700">

            <h1 className="text-4xl text-center my-8 text-white font-bold">

                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}

            </h1>

            <form
                className="w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovoTema}
            >

                <div className="flex flex-col gap-2">

                    <label
                        htmlFor="descricao"
                        className="text-white"
                    >
                        Descrição do Tema
                    </label>

                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-white rounded p-2
                                   bg-gray-700 text-white
                                   placeholder:text-slate-300"

                        value={tema.descricao}

                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />

                </div>

                <button
                    className="rounded text-white bg-purple-900
                               hover:bg-purple-800
                               w-1/2 py-2 mx-auto flex justify-center items-center"
                    type="submit"
                >

                    {isLoading ? (

                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        />

                    ) : (

                        <span>
                            {id === undefined ? 'Cadastrar' : 'Atualizar'}
                        </span>

                    )}

                </button>

            </form>

        </div>
    );
}

export default FormTema;