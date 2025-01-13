import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import App from './App.jsx';
import ErrorPage from './routes/ErroPage/ErrorPage.jsx';
import Movie from './routes/Movie/Movie.jsx';
import Home from './routes/Home/Home.jsx';
import Search from './routes/Search/Search.jsx';
import { FilterProvider } from './context/FilterProvider.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/movie/:id',
                element: <Movie />,
            },
            {
                path: '/search',
                element: <Search />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <FilterProvider>
            <RouterProvider router={router}></RouterProvider>
        </FilterProvider>
    </StrictMode>
);
