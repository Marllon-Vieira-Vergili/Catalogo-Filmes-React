import { useContext } from "react";
import {FavoritesContext} from "../context/FavoriteContext";


//Exportando hook customizado para usar o contexto
export function useFavorites(){
    const context = useContext(FavoritesContext);

    if(!context){
        throw new Error("Contexto deve ser usado dentro de FavoritesProvider");
    }

    return context;
}