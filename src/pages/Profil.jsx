import React from "react";
import Cookies from 'js-cookie'; 

function Profil(){
    const Auth = Cookies.get("token");
    if(Auth){
        return(
            <div>
                <h1>Profil</h1>
                <p>Connecté</p>
            </div>
        )
    } 
    return(
        <div>
        <h1>Profil</h1>
        <p>Connecter vous</p>
    </div>
    )

}
export default Profil