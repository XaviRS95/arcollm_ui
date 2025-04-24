import './BannerComponentStyles.css'
import bannerlogo from '/arco-banner.png'
import iconlogo from '/arco-icon.png'
import {Link} from "react-router-dom";

export default function BannerComponentMain(){

    return (
        <div id="navbar">
            <div id="auxdiv"/>
            <div id="navbarlogodiv">
                <img id="navbarlogo" src={bannerlogo} alt={"404"}/>
            </div>
            <div id="loginimgdiv">
                <Link to={"/login/"}>
                    <img id="loginimg" src={iconlogo} alt={"404"}/>
                </Link>
            </div>
        </div>
    );
}