import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { AuthContext } from "../../contexts/AuthContext";

function Perfil() {

	const navigate = useNavigate();

	const { usuario } = useContext(AuthContext);

	useEffect(() => {

		if (usuario.token === "") {

			ToastAlerta("Você precisa estar logado", "info");

			navigate("/");

		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usuario.token]);

	return (

		<div className="min-h-screen bg-[#070b14] flex justify-center px-4 py-8">

			<div className="container mx-auto max-w-5xl rounded-4xl overflow-hidden border border-[#e8b4c710] shadow-2xl">

				{/* CAPA */}
				<img
					className="w-full h-72 object-cover border-b border-[#e8b4c720]"
					src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1400&auto=format&fit=crop"
					alt="Capa do Perfil"
				/>

				{/* FOTO */}
				<img
					className="rounded-full w-56 h-56 object-cover mx-auto 
							   -mt-32 border-8 border-[#070b14] relative z-10 shadow-xl"
					src={usuario.foto || 'https://i.imgur.com/pK6vSCy.png'}
					alt="Foto de perfil"
				/>

				{/* CONTEÚDO */}
				<div
					className="relative -mt-24 min-h-72 flex flex-col 
							   bg-[#1e293b] text-[#f8fafc] text-xl 
							   items-center justify-center gap-5 px-6 py-10"
				>

					<span className="text-[#e8b4c7] font-semibold">
						✨ Perfil do Usuário
					</span>

					<h1 className="text-4xl font-bold">
						{usuario.nome}
					</h1>

					<p className="text-[#94a3b8]">
						{usuario.usuario}
					</p>

				</div>

			</div>

		</div>
	)
}

export default Perfil;