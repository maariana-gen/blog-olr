import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='border border-black
            flex flex-col rounded-2xl overflow-hidden justify-between'>
                
            <div>

                <div className="flex w-full bg-purple-900 py-2 px-4 items-center gap-4">

                    <img
                        src={postagem.usuario?.foto || 'https://i.imgur.com/pK6vSCy.png'}
                        className='h-12 rounded-full'
                        alt={postagem.usuario?.nome}
                    />

                    <h3 className='text-lg font-bold text-center uppercase text-white'>
                        {postagem.usuario?.nome}
                    </h3>

                </div>

                <div className='p-4 bg-slate-200'>

                    <h4 className='text-lg font-semibold uppercase'>
                        {postagem.titulo}
                    </h4>

                    <p>{postagem.texto}</p>

                    <p>Tema: {postagem.tema?.descricao}</p>

                    <p>
                        Data: {new Intl.DateTimeFormat("pt-BR", {
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        }).format(new Date(postagem.data))}
                    </p>

                </div>

            </div>

            <div className="flex">

                <Link 
                    to={`/editarpostagem/${postagem.id}`}
                    className='w-full text-white bg-purple-900 
                    hover:bg-purple-800 flex items-center 
                    justify-center py-2 border-r border-black'
                >
                    <button>Editar</button>
                </Link>

                <Link 
                    to={`/deletarpostagem/${postagem.id}`}
                    className='text-white bg-purple-900 
                    hover:bg-purple-800 w-full flex 
                    items-center justify-center'
                >
                    <button>Deletar</button>
                </Link>

            </div>

        </div>
    )
}

export default CardPostagem