import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FilterProvider } from './context/FilterProvider.jsx';

import './index.css';

import App from './App.jsx';
import ErrorPage from './routes/ErroPage/ErrorPage.jsx';
import Movie from './routes/Movie/Movie.jsx';
import Home from './routes/Home/Home.jsx';
import Search from './routes/Search/Search.jsx';
import AllMovies from './routes/AllMovies/AllMovies.jsx';
import NewMovies from './routes/NewMovies/NewMovies.jsx';
import CategoryMovies from './routes/CategoryMovies/CategoryMovies.jsx';
import YearsMovies from './routes/YearsMovies/YearsMovies.jsx';




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
            {
                path: '/allmovies',
                element: <AllMovies />,
            },
            {
                path: '/newmovies',
                element: <NewMovies />,
            },
            {
                path: '/category/:category',
                element: <CategoryMovies />,
            },
            {
                path: '/yearsmovies/:year',
                element: <YearsMovies />,
            }
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
