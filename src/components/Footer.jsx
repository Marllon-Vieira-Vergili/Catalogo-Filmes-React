import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from './../images/logo.svg';
import './../styles/Footer.css';


export default function Footer(){


    return(
        <footer className="footer-container">
            <div className="logo">

                
                <p className='text-white'>Criado por Marllon Vieira Vergili</p>


                <img src={logo} alt="marllonFlix logo"/>
                
            </div>
        </footer>
    );
}