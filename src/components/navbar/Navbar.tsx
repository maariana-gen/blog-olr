import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {

        handleLogout();
        ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
        navigate("/");

    }

    let component: ReactNode;

    if (usuario.token !== "") {

        component = (

            <header className="w-full bg-[#070b14]/95 border-b border-[#e8b4c710] text-[#f8fafc] shadow-lg backdrop-blur-md">

                <div className="container mx-auto flex items-center justify-between px-8 py-5">

                    {/* LOGO */}
                    <Link
                        to="/home"
                        className="text-2xl font-bold tracking-wide text-[#e8b4c7]"
                    >
                        Blog OLR
                    </Link>

                    {/* MENU */}
                    <nav className="flex items-center gap-6 text-base font-medium">

                        <Link
                            to="/postagens"
                            className="text-[#94a3b8] hover:text-[#f8fafc] transition"
                        >
                            Postagens
                        </Link>

                        <Link
                            to="/temas"
                            className="text-[#94a3b8] hover:text-[#f8fafc] transition"
                        >
                            Temas
                        </Link>

                        <Link
                            to="/cadastrartema"
                            className="text-[#94a3b8] hover:text-[#f8fafc] transition"
                        >
                            Cadastrar tema
                        </Link>

                        <Link
                            to="/perfil"
                            className="text-[#94a3b8] hover:text-[#f8fafc] transition"
                        >
                            Perfil
                        </Link>

                        <Link
                            to="/"
                            onClick={logout}
                            className="text-[#94a3b8] hover:text-[#f8fafc] transition"
                        >
                            Sair
                        </Link>

                    </nav>

                </div>

            </header>

        );

    }

    return <>{component}</>;
}

export default Navbar;