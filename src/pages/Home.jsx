import { useState, useEffect } from "react";
import api from "../configs/api";
import './../styles/Home.css';
import PopularMovies from "../components/PopularMovies";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/usefavorite";

export default function Home(){

    const navigator = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [goToPage, setGoToPage] = useState("");

    const {isFavorito, toggleFavorito} = useFavorites();


    useEffect(() => {

        async function carregarFilmes(){

            try{
                setLoading(true);
                const response = await api.get("movie/now_playing", {
                params: {
                api_key: import.meta.env.VITE_CHAVE_AQUI,
                language: 'pt-BR',
                page: currentPage
                }
            });

            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
            setError(false);
        }

                catch(e){
                    setError(true);
                }finally{
                    setLoading(false);
                }
            }
            

        carregarFilmes();
    }, [currentPage]);

    if(loading){

        return(
        <h2 className="loading-message">Aguarde...Carregando os dados</h2>
    );
}

if(error){

return ( 
     <p>Erro ao carregar os filmes. 
     Por favor, recarregue a página.
        </p>
            
    );
}

    return(

        <article className="home-container">

        <PopularMovies/>

           
           

            <div className="cards-movies">
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                        

                            <strong>Nome do Filme: {movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className="home-image"/>
                            <p>{movie.overview}</p>
                            <p>Ano de Lançamento: <strong>{movie.release_date?.slice(0,4)}</strong></p>
                            

                            <div className="buttons-group">

                                <Link to={`/movie/${movie.id}`}>Acessar</Link>
                                <button onClick={() => toggleFavorito(movie)}>{isFavorito(movie.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

                    
            
            {/**PAGINAÇÂO */}
            <div className="number-pages">
                    {/**Botão Voltar */}
                    <button onClick={()=> setCurrentPage(currentPage -1)}
                    disabled={currentPage === 1}>Voltar</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={()=> setCurrentPage(currentPage + 1)}
                    disabled={currentPage > currentPage.length}>Avançar</button>
            </div>

            {/**Ir direto para a página */}
                <div className="go-to-page">

                    <input type="number"
                        placeholder="Insira o número da página"
                        className="input-number"
                        value={goToPage}
                        onChange={(e) => setGoToPage(e.target.value)}
                    />

                    <button onClick={() => {
                        const page = Number(goToPage);

                        if(page >= 1 && page <= totalPages){
                            setCurrentPage(page);
                        }
                
                    }}>Ir</button>
                </div>
           

        </article>
    );
}
