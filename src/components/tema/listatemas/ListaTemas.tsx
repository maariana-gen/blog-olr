import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

import type Tema from "../../../models/Tema";

import { buscar } from "../../../services/Service";

import CardTema from "../cardtema/CardTema";

function ListaTemas() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [temas, setTemas] = useState<Tema[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    useEffect(() => {

        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    async function buscarTemas() {

        try {

            setIsLoading(true);

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

        } finally {

            setIsLoading(false);

        }
    }

    useEffect(() => {

        async function carregarTemas() {
            await buscarTemas();
        }

        carregarTemas();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>

            {isLoading && (

                <div className="flex justify-center w-full my-8 bg-[#070b14]">

                    <SyncLoader
                        color="#e8b4c7"
                        size={24}
                    />

                </div>

            )}

            <div className="flex justify-center w-full min-h-screen bg-[#070b14] py-8 px-4">

                <div className="container flex flex-col">

                    {(!isLoading && temas.length === 0) && (

                        <span className="text-3xl text-center my-8 text-[#f8fafc] font-semibold">

                            Nenhum tema foi encontrado.

                        </span>

                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {temas.map((tema) => (

                            <CardTema
                                key={tema.id}
                                tema={tema}
                            />

                        ))}

                    </div>

                </div>

            </div>

        </>
    );
}

export default ListaTemas;