import { Link } from 'react-router-dom'

import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {

    return (

        <div
            className="border border-[#e8b4c710] bg-[#1e293b]
                       flex flex-col rounded-3xl overflow-hidden
                       justify-between shadow-xl hover:scale-[1.01]
                       transition duration-300"
        >

            <div>

                <div
                    className="flex w-full bg-[#0f172a]
                               py-3 px-5 items-center gap-4
                               border-b border-[#e8b4c710]"
                >

                    <img
                        src={postagem.usuario?.foto || 'https://i.imgur.com/pK6vSCy.png'}
                        className="h-12 w-12 rounded-full object-cover border border-[#e8b4c730]"
                        alt={postagem.usuario?.nome}
                    />

                    <h3 className="text-lg font-semibold text-[#e8b4c7]">
                        {postagem.usuario?.nome}
                    </h3>

                </div>

                <div className="p-5 flex flex-col gap-4">

                    <h4 className="text-2xl font-bold text-[#f8fafc]">
                        {postagem.titulo}
                    </h4>

                    <p className="text-[#94a3b8] leading-relaxed">
                        {postagem.texto}
                    </p>

                    <div className="flex flex-col gap-2">

                        <span
                            className="w-fit rounded-full
                                       bg-[#e8b4c715]
                                       px-4 py-1
                                       text-sm font-medium
                                       text-[#e8b4c7]
                                       border border-[#e8b4c720]"
                        >
                            {postagem.tema?.descricao}
                        </span>

                        <p className="text-sm text-[#64748b]">
                            {new Intl.DateTimeFormat("pt-BR", {
                                dateStyle: 'full',
                                timeStyle: 'short',
                            }).format(new Date(postagem.data))}
                        </p>

                    </div>

                </div>

            </div>

            <div className="flex border-t border-[#e8b4c710]">

                <Link
                    to={`/editarpostagem/${postagem.id}`}
                    className="w-full text-[#f8fafc]
                               bg-[#0f172a]
                               hover:bg-[#c08497]
                               flex items-center justify-center
                               py-3 transition-all"
                >
                    <button className="font-medium">
                        Editar
                    </button>
                </Link>

                <div className="w-px bg-[#e8b4c710]" />

                <Link
                    to={`/deletarpostagem/${postagem.id}`}
                    className="w-full text-[#f8fafc]
                               bg-[#0f172a]
                               hover:bg-[#c08497]
                               flex items-center justify-center
                               py-3 transition-all"
                >
                    <button className="font-medium">
                        Deletar
                    </button>
                </Link>

            </div>

        </div>

    )
}

export default CardPostagem