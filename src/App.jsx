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
        </div>
    );
}

export default App;
