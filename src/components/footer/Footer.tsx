import {
    FacebookLogoIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon
} from "@phosphor-icons/react";

import { useContext, type ReactNode } from "react";

import { AuthContext } from "../../contexts/AuthContext";

function Footer() {

    const data = new Date().getFullYear();

    const { usuario } = useContext(AuthContext);

    let component: ReactNode;

    if (usuario.token !== "") {

        component = (

            <footer className="bg-[#070b14] border-t border-[#e8b4c710] text-[#f8fafc]">

                <div className="container mx-auto flex flex-col items-center gap-4 px-8 py-8">

                    {/* TEXTO */}
                    <p className="text-lg font-semibold text-[#e8b4c7]">
                        Blog OLR
                    </p>

                    <p className="text-sm text-[#94a3b8] text-center">
                        © {data} • Desenvolvido por Mariana Soares
                    </p>

                    {/* REDES */}
                    <div className="flex gap-5">

                        <a
                            href="https://www.linkedin.com/in/mariana-de-oliveira-soares-66b500315?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                            target="_blank"
                            className="text-[#94a3b8] hover:text-[#e8b4c7] transition"
                        >
                            <LinkedinLogoIcon size={30} weight="fill" />
                        </a>

                        <a
                            href="https://www.instagram.com/maari_olr"
                            target="_blank"
                            className="text-[#94a3b8] hover:text-[#e8b4c7] transition"
                        >
                            <InstagramLogoIcon size={30} weight="fill" />
                        </a>

                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            className="text-[#94a3b8] hover:text-[#e8b4c7] transition"
                        >
                            <FacebookLogoIcon size={30} weight="fill" />
                        </a>

                    </div>

                </div>

            </footer>

        );

    }

    return <>{component}</>;
}

export default Footer;