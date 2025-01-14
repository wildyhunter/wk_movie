import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading">
            <p>Carregando...</p>
            <AiOutlineLoading3Quarters className="loadingIcon" />
        </div>
    );
};

export default Loading;
