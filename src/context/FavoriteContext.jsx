import { createContext } from "react";
import { useContext, useEffect, useState } from "react";


export const FavoritesContext = createContext();

export function FavoritesProvider({children}){



    const [favFilmes, setFavFIlmes] = useState([]);

    //UseEffect para carregar os favoritos do localStorage quando o app inicia
    useEffect(() => {

        const favoritosLocalStorage = localStorage.getItem("@marllonFlix:favoritos");

        if(favoritosLocalStorage){
            setFavFIlmes(JSON.parse(favoritosLocalStorage))
        }
    }, []);

    //Salvar no localStorage sempre que os favoritos mudar
    useEffect(() => {
        localStorage.setItem("@marllonFlix:favoritos", JSON.stringify(favFilmes));
    }, [favFilmes]); 

    function adicionarFavoritos(filme){

        //Verificar se o filme ja existe no localStorage
        const jaExiste = favFilmes.some(fav => fav.id === favFilmes.id);

        if(jaExiste){
            alert("Este filme ja está nos favoritos.");
            return false;
        }

        //Senão... adicionar no array
        setFavFIlmes([filme, ...favFilmes]);
        alert("Filme adicionado com sucesso nos favoritos!");
        return true;
    }

    function removerFavoritos(filmeId){
        
        //Criar novoArray de favoritos
        const novosFavoritos = favFilmes.filter(fav => fav.id !== filmeId);
        setFavFIlmes(novosFavoritos);
        alert("Filme removido com sucesso!");
    }

    //verificar se filme ja está nos favoritos
    function isFavorito(filmeId){
        return favFilmes.some(fav => fav.id === filmeId);
    }

    //Adicionar se não tem, remove se tem.
    function toggleFavorito(filme){
        if(isFavorito(filme.id)){
            removerFavoritos(filme.id);
        }else{
            adicionarFavoritos(filme);
        }
    }


    return(
        <FavoritesContext.Provider value={{
        favFilmes,
        adicionarFavoritos,
        removerFavoritos,
        isFavorito,
        toggleFavorito
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}