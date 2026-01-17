import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../configs/api";
import { useFavorites } from "../hooks/usefavorite";
import '../styles/MovieInformation.css'

export default function MovieInformation(){
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {isFavorito, toggleFavorito } = useFavorites();

    useEffect(() => {
        async function obterDadosDoFilme(){
            try{
                setIsLoading(true);
                // CORRIGIDO: api.get() precisa de parênteses, não crases
                const response = await api.get(`movie/${id}`, {
                    params: {
                        api_key: "process.env.CHAVE_AQUI",
                        language: "pt-BR"
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setFilme(response.data);
                setError(false);
                setIsLoading(false);
            }catch(err){
                setIsLoading(false);
                setError(true);
            }
        }
        obterDadosDoFilme();
    }, [id]);
        
    return(
        <section className="movie-info-section">
            {error && <h2>Erro... não foi possível localizar o item.</h2>}
            {isLoading && <h2>Carregando informações...</h2>}
            
            {!error && !isLoading && (
                <>
                    <h1>Informações do filme</h1>
                    <div className="container-movie-information">
                        {/* CORRIGIDO: src={} com crases dentro */}
                        <img 
                            src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
                            alt={filme.title} 
                            className="home-image"
                        /> 
                        <div className="movie-text">            
                        <p>Nome do Filme: <span>{filme.title}</span></p>
                        <p>Descrição: {filme.overview}</p>
                        <p>Gênero: <span>{filme.genres?.map(genre => genre.name).join(', ')}</span></p>
                        <p>Ano de Lançamento: <strong>{filme.release_date?.slice(0,4)}</strong></p>
                        </div> 
                    </div>
                    
                    <div className="actions-button">
                        
                        <Link 
                            target="_blank" 
                            to={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}
                            rel="noreferrer"
                        >
                            Ver Trailer
                        </Link>
                        <button onClick={() => toggleFavorito(filme)}>{isFavorito(filme.id) ? 'Remover do Favoritos'
                        : 'Adicionar aos favoritos'}</button>
                        <Link to="/">Voltar a página principal</Link>
                        <Link target="_blank" to={filme.homepage} rel="noreferrer">
                            Acessar na NetFlix
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
}
