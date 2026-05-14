import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

function Perfil() {

	const navigate = useNavigate();

	const { usuario } = useContext(AuthContext);

	useEffect(() => {

		if (usuario.token === "") {

			alert("Você precisa estar logado");

			navigate("/");

		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usuario.token]);

	return (

		<div className="min-h-screen bg-gray-700 flex justify-center mx-4">

			<div className="container mx-auto my-4 rounded-2xl overflow-hidden">

				<img
					className="w-full h-72 object-cover border-b-8 border-white"
					src="https://i.imgur.com/8kzhfoq.png"
					alt="Capa do Perfil"
				/>

				<img
					className="rounded-full w-56 h-56 object-cover mx-auto 
							   -mt-32 border-8 border-white relative z-10"
					src={usuario.foto || 'https://i.imgur.com/pK6vSCy.png'}
					alt=""
				/>

				<div
					className="relative -mt-24 h-72 flex flex-col 
							   bg-purple-900 text-white text-2xl 
							   items-center justify-center gap-4"
				>

					<p>

						Nome: {usuario.nome}

					</p>

					<p>

						Email: {usuario.usuario}

					</p>

				</div>

			</div>

		</div>
	)
}

export default Perfil