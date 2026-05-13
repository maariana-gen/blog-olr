import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormPostagem from '../formpostagem/FormPostagem';

function ModalPostagem() {

    return (

        <>
        
            <Popup
                trigger={
                    <button
                        className='border border-white rounded-xl 
                                   px-4 py-2 bg-gray-700 text-white
                                   hover:bg-gray-600 transition-all
                                   font-semibold shadow-md'
                    >
                        Nova Postagem
                    </button>
                }

                modal

                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem',
                    background: '#374151',
                    border: '2px solid #581c87',
                    width: '60%'
                }}
            >

                <FormPostagem />

            </Popup>

        </>
    );
}

export default ModalPostagem;