import ListaPostagens from "../../components/postagem/listadepostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

function Home() {
    return (
        <>
            <section className="bg-[#070b14] text-[#f8fafc] flex justify-center overflow-hidden">

                <div className="container grid grid-cols-1 md:grid-cols-2 items-center px-8 py-16 gap-10">

                    {/* TEXTO */}
                    <div className="flex flex-col gap-5 items-start justify-center">

                        <span className="text-[#e8b4c7] font-semibold">
                            ✨ Blog OLR
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Seja Bem-Vindo!
                        </h1>

                        <p className="text-lg text-[#94a3b8] max-w-xl leading-relaxed">
                            Um espaço criado para registrar pensamentos,
                            trocar experiências e transformar aprendizados
                            em conexões.
                        </p>

                        {/* BOTÃO */}
                        <div className="flex justify-center w-full mt-2">
                            <ModalPostagem />
                        </div>

                    </div>

                    {/* IMAGEM */}
                    <div className="flex justify-center items-center">

                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                            alt="Pessoa utilizando notebook"
                            className="w-full max-w-md rounded-4xl border border-[#e8b4c720] shadow-2xl object-cover"
                        />

                    </div>

                </div>

            </section>

            <section className="bg-[#0f172a] min-h-screen py-10">
                <ListaPostagens />
            </section>
        </>
    )
}

export default Home