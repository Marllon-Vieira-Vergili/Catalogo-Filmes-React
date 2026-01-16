import { Link } from "react-router-dom";
import error from './../images/error.svg'
import './../styles/Error.css';


export default function Error(){

    return(

        <section className="error-container">

            <img src={error}/>
            
            <Link to= '/' className="error-style">Voltar a página Principal</Link>
        </section>

    );
}