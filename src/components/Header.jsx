import logo from './../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import './../styles/Header.css';
import api from '../configs/api';

import { useState, } from 'react';



export default function Header(){

    const [nomeFilme, setNomeFilme] = useState("");
    


    const navigate = useNavigate();
    

        async function buscarFilme(e){
            
            e.preventDefault();
            
        try{

            const response = await api.get("search/movie", {
            params: {
                api_key: import.meta.env.VITE_CHAVE_AQUI,
                language: "pt-BR",
                query: nomeFilme
            }
        });

        if(response.data.results.length === 0){
            alert("Nenhum Filme foi encontrado!");
            return;
        }

        const filmeLocalizado = response.data.results[0];

        navigate(`movie/${filmeLocalizado.id}`)

        }catch(error){
            alert("Nenhum Filme localizado!");
        }

    }

   


    


    return(
        <header className='header-container'>

        <Link to={"/"}>
            <div className='img-logo'>
                <img src={logo} alt='logo' className='logo-header'/>
                
            </div>
        </Link> 
            
            
            <div className='options-menu'>
                <ul>
                    <li>
                        <Link to={'/favoritos'}>Favoritos</Link>
                        
                        <form onSubmit={buscarFilme}>
                        <input type='text'
                            placeholder='Buscar Nome do Filme...'
                            value={nomeFilme}
                            onChange={(e) => setNomeFilme(e.target.value)}
                        />
                        <button type='submit'>Buscar</button>
                        </form>
                    </li>
                    
                </ul>
            </div>
            
        </header>
    );

}
