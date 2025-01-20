import { Outlet } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Filters from './components/Filter/Filters';

import './App.css';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Filters />
            <Outlet />
            <footer className="footerContainer">
                <p>WildyDev © 2024 - Todos os direitos reservados</p>
            </footer>
        </div>
    );
}

export default App;
