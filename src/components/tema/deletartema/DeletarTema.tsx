import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners";

function DeletarTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)

    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {

        try {

            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {

        if (token === '') {

            alert('Você precisa estar logado')

            navigate('/')

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    useEffect(() => {

        if (id !== undefined) {

            buscarPorId(id)

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    async function deletarTema() {

        setIsLoading(true)

        try {

            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            alert('Tema deletado com sucesso')

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.toString().includes('401')) {

                handleLogout()

            } else {

                alert('Erro ao deletar o tema.')

            }
        }

        setIsLoading(false)

        retornar()
    }

    function retornar() {

        navigate("/temas")

    }
    
    return (

        <div className='min-h-screen bg-gray-700 flex items-center justify-center'>

            <div className='container w-1/3 mx-auto'>

                <h1 className='text-4xl text-center my-4 text-white font-bold'>
                    Deletar tema
                </h1>

                <p className='text-center font-semibold mb-4 text-white'>
                    Você tem certeza de que deseja apagar o tema a seguir?
                </p>

                <div className='border border-black flex flex-col rounded-2xl overflow-hidden justify-between'>

                    <header 
                        className='py-2 px-6 bg-purple-900 text-white font-bold text-2xl'>
                        Tema
                    </header>

                    <p className='p-8 text-3xl bg-slate-200 h-full'>
                        {tema.descricao}
                    </p>

                    <div className="flex">

                        <button 
                            className='text-white bg-purple-900 hover:bg-purple-800 
                                       w-full py-2 border-r border-black'
                            onClick={retornar}>
                            Não
                        </button>

                        <button 
                            className='w-full text-white bg-purple-900 
                                       hover:bg-purple-800 flex items-center justify-center'
                            onClick={deletarTema}>

                            { isLoading ? 
                                <ClipLoader 
                                    color="#ffffff" 
                                    size={24}
                                /> : 
                                <span>Sim</span>
                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default DeletarTema