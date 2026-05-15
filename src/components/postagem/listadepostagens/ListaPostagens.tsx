import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";

import type Postagem from "../../../models/Postagem";

import { buscar } from "../../../services/Service";

import CardPostagem from "../cardpostagem/CardPostagem";

function ListaPostagens() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario } = useContext(AuthContext);

    const token = usuario.token;

    useEffect(() => {

        async function buscarPostagens() {

            if (token === "") {

                navigate("/");

                return;

            }

            try {

                setIsLoading(true);

                await buscar("/postagens", setPostagens, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            } catch (error) {

                console.log(error);

            } finally {

                setIsLoading(false);

            }
        }

        buscarPostagens();

    }, [token, navigate]);

    return (

        <div className="min-h-screen bg-[#0f172a]">

            {isLoading && (

                <div className="flex justify-center w-full my-8">

                    <SyncLoader
                        color="#e8b4c7"
                        size={24}
                    />

                </div>

            )}

            <div className="flex justify-center w-full py-8">

                <div className="container flex flex-col px-4">

                    {!isLoading && postagens.length === 0 && (

                        <span className="text-3xl text-center my-8 text-[#f8fafc] font-semibold">

                            Nenhuma postagem foi encontrada.

                        </span>

                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {postagens.map((postagem) => (

                            <CardPostagem
                                key={postagem.id}
                                postagem={postagem}
                            />

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ListaPostagens;