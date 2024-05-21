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
        <div className="container mx-auto flex flex-col items-center">
        <div className="w-full md:w-1/2">
            <NewPost />
        </div>
        <div className="w-full md:w-1/2 mt-4">
            <ShowPost />
        </div>
        </div>
    )
}
export default Home