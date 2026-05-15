import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import FormPostagem from '../formpostagem/FormPostagem';

function ModalPostagem() {

    return (

        <>

            <Popup
                trigger={

                    <button
                        className="border border-[#e8b4c740]
                                   rounded-xl px-5 py-3
                                   bg-[#b76e79]
                                   text-[#f8fafc]
                                   hover:bg-[#c08497]
                                   transition-all
                                   font-semibold shadow-lg"
                    >

                        Nova Postagem

                    </button>

                }

                modal

                contentStyle={{

                    borderRadius: '2rem',
                    padding: '0',
                    background: '#1e293b',
                    border: '1px solid rgba(232, 180, 199, 0.12)',
                    width: '65%',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.35)'

                }}
            >

                <FormPostagem />

            </Popup>

        </>

    );
}

export default ModalPostagem;