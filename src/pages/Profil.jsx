import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie'; 
import {useAtom} from 'jotai'
import { userAtom } from '../atoms/getUser';
import UpdateUser from '../components/UpdateUser'

function Profil(){

  const { userSlug } = useParams();
  const [userInfo,setUserInfo] =useState(null);
  const token = Cookies.get("token");
  const [user] = useAtom(userAtom);

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
      <div className="container mx-auto flex flex-col items-center bg-orange-50 space-y-4">
        <div className="p-4 bg-slate-100 rounded-lg shadow-md">
          <h1 className="mb-2">Profil de : {userInfo.username}</h1>
          <p className="mb-2">description: {userInfo.description ? userInfo.description :"Cet utilisateur n'as pas de description"}</p>
        </div>
        <div className="p-4 bg-slate-100 rounded-lg shadow-md">
            <p>Likes de l'utilisateur :</p>
            {userInfo.post_likeds && userInfo.post_likeds.length > 0 ? (
              <ul className="p-4 bg-slate-100">
                {userInfo.post_likeds.map(post => (
                  <li key={post.id}>
                    <p>{post.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              "Cet utilisateur n'a pas liké de post"
            )}
          </div>
        {userInfo.id === user.id ?(<UpdateUser/>):(<p></p>) }
      </div>
    )

}
export default Profil