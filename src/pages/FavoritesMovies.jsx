import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/usefavorite";
import './../styles/FavoritesMovies.css';

export default function FavoritesMovies(){

    const {favFilmes, removerFavoritos} = useFavorites();

    function handleRemoveFavorite(id){
        
    }

    return(

        <section className="favoritos-container">
            <h1>Meus Filmes Favoritos</h1>
            <p className="contador-favoritos">Você tem: {favFilmes.length} filme(s) favoritos</p>

            <div className="card-movies">
                {favFilmes === 0 ? (
                    <div className="empty-fav-movies">
                        <p>Você não possui nenhum filme adicionado ainda na lista.</p>
                        <Link to={"/"}>Descubra novos filmes agora!</Link>
                    </div>
                ) : (
                    <div className="card-favoritos">
                        {favFilmes.map((filme) => (
                            <div className="filme-card" id={filme.id}>
                                 <img
                                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                alt={filme.title}
                            />
                            <h2>Título: {filme.title}</h2>
                            <p>{filme.overview}</p>
                            <p>Ano de Lançamento: <strong>{filme.release_date?.slice(0,4)}</strong></p>
                            

                            <div className="buttons-group">

                                <Link to={`/movie/${filme.id}`}>Acessar</Link>
                                
                            </div>

                            </div>

                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}