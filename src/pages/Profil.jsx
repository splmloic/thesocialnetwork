import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie'; 

function Profil(){

  const { userSlug } = useParams();
  const [userInfo,setUserInfo] =useState(null);
  const token = Cookies.get("token");

    useEffect(()=>{
        if(token && userSlug){
            fetch(`http://localhost:1337/api/users?filters[username][$eq]=${userSlug}&populate=post_likeds`,{
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setUserInfo(data[0]);
            })
            .catch(error => console.error('Error fetching user:', error));
        }
    }, [userSlug, token])

    if (!userInfo) {
      return <p>Loading...</p>;
    }  
    return(
        <div>
          <h1>Profil de {userInfo.username}</h1>
          <p>description: {userInfo.description ? userInfo.description :"Cet utilisateur n'as pas de description"}</p>
          <div>
          <p>Likes de l'utilisateur</p>
          {userInfo.post_likeds && userInfo.post_likeds.length > 0 ? (
            <ul>
              {userInfo.post_likeds.map(post => (
                <li key={post.id}>
                  {post.text}
                </li>
              ))}
            </ul>
          ) : (
            "Cet utilisateur n'a pas liké de post"
          )}
        </div>
        </div>
    )

}
export default Profil