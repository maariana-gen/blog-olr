import { toast } from "react-toastify";

export function ToastAlerta(mensagem: string, tipo: string) {
    const config = {
        position: "top-right" as const,
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark" as const,
        progress: undefined,
        className: "toast-olr",
        progressClassName: "toast-olr-progress",
    };

    switch (tipo) {
        case "sucesso":
            toast.success(mensagem, config);
            break;

        case "erro":
            toast.error(mensagem, config);
            break;

        case "info":
        default:
            toast.info(mensagem, config);
            break;
    }
}