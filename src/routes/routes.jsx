/*Arquivo de configuração de rotas */

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Error from '../pages/Error';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import MovieInformation from '../pages/MovieInformation';
import FavoritesMovies from '../pages/FavoritesMovies';
import  { FavoritesProvider } from '../context/FavoriteContext';

function CreateRouter(){

    return(
        <BrowserRouter>
            <Header/>
            <FavoritesProvider>
            <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/movie/:id' element={<MovieInformation/>}/>
            <Route path='/favoritos' element={<FavoritesMovies/>}/>
            
            <Route path='*' element={<Error/>}/>
            </Routes>
            <Footer/>
            </FavoritesProvider>
        </BrowserRouter>
    );
}

export default CreateRouter;