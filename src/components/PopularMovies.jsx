import { useEffect, useState } from "react";
import api from "../configs/api";

import "./../styles/PopularMovies.css";
import { Link } from "react-router-dom";




export default function PopularMovies() {


    const [filmesDestaque, setFilmesDestaque] = useState([]);

    

    useEffect(() => {

        async function localizarOsDestaquesDoMomento() {

            const response = await api.get("movie/popular", {
                params: {
                    api_key: import.meta.env.VITE_CHAVE_AQUI,
                    language: "pt-BR",
                    page: 1
                }
            });

            setFilmesDestaque(response.data.results);
        }

        localizarOsDestaquesDoMomento();
    }, []);

    return (
        <section className="container-destaques">
            <h2 className="lead">Acompanhe os Filmes em destaques do momento!</h2>
            <div id="carouselDestaques" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">

                    {filmesDestaque.map((filme, index) => (
                        <div key={filme.id} className={`carousel-item ${index === 0 ? 'active' : ""}`}>

                            <img 
                            src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} 
                            alt={filme.title} className="popular-image" 

                            />
                            <div className="carousel-buttons">
                                <Link target="_blank" to={`https://www.youtube.com/results?search_query=${filme.title} + Trailer`}>Trailer</Link>
                                <Link to={`movie/${filme.id}`}>Detalhes</Link>
                            </div>

                        </div>
                    ))}
                </div>




            </div>
        </section>
    );
}
