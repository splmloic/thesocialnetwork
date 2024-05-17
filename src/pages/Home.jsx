import React from "react";
import NewPost from "../components/NewPost"
import ShowPost from "../components/ShowPost"
import Cookies from 'js-cookie'

function Home(){
    const token = Cookies.get('token');
    if(!token){
        return(
            <div>
                <h1>Home</h1>
                <p>Pour acceder a l'application veuillez vous connecter/vous inscrire</p>
            </div>
        )
    }
    return(
        <div>
            <h1>Home</h1>
            <NewPost/>
            <ShowPost/>
        </div>
    )
}
export default Home