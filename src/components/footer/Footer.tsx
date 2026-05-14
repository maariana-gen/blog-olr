import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"

function Footer() {

     // eslint-disable-next-line prefer-const
     let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode
    
        if (usuario.token !== "") {
    
            component = ( 

            <div className="flex justify-center bg-gray-700 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                            Blog Pessoal Mariana Soares | Copyright: {data}
                        </p>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/mariana-de-oliveira-soares-66b500315?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank">
                            <LinkedinLogoIcon size={48} weight='bold' />
                        </a>
                        <a href="https://www.instagram.com/maari_olr" target="_blank">
                            <InstagramLogoIcon size={48} weight='bold' />
                        </a>
                        <a href="https://www.facebook.com/seu_usuario" target="_blank">
                            <FacebookLogoIcon size={48} weight='bold' />
                        </a>
                    </div>
                </div>
            </div>
            )
        }

         return (
        <>
            { component }
        </>
    )
}

export default Footer