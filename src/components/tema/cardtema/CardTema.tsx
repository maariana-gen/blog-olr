import { Link } from 'react-router-dom'

import type Tema from '../../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {

    return (

        <div
            className="border border-[#e8b4c710]
                       bg-[#1e293b]
                       flex flex-col rounded-3xl
                       overflow-hidden justify-between
                       shadow-xl hover:scale-[1.02]
                       transition duration-300"
        >

            {/* HEADER */}
            <header
                className="py-3 px-6 bg-[#0f172a]
                           text-[#e8b4c7]
                           font-bold text-2xl
                           border-b border-[#e8b4c710]"
            >

                Tema

            </header>

            {/* CONTEÚDO */}
            <p
                className="p-8 text-2xl text-[#f8fafc]
                           bg-[#1e293b] h-full
                           flex items-center justify-center
                           text-center font-semibold"
            >

                {tema.descricao}

            </p>

            {/* BOTÕES */}
            <div className="flex border-t border-[#e8b4c710]">

                <Link
                    to={`/editartema/${tema.id}`}
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
                    to={`/deletartema/${tema.id}`}
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

export default CardTema