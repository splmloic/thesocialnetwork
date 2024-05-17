import React,{useState,useEffect} from "react";
import Cookies from 'js-cookie'; 

function Profil(){
  const [userInfo,setUserInfo] =useState("");
    const [username,setUsername] = useState("");
    const [desc,setDesc] = useState("");
    const [email,setEmail] = useState("");

    const Auth = Cookies.get("token");

    useEffect(()=>{
        if(Auth){
            fetch('http://localhost:1337/api/users/me',{
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${Auth}`,
                  'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setUserInfo(data);
                setEmail(data.email);
                setUsername(data.username);
                setDesc(data.description);
            })
        }
    }, [Auth])

    const handleUpdate = async (e) => {
      e.preventDefault();
      if (!userInfo) {
        return;
      }
      const data = {
        username,
        email,
        desc // Ajout de la description dans les données envoyées
      };
      try {
        const response = await fetch(`http://localhost:1337/api/users/${userInfo.id}`, { // Utilisation correcte de l'ID de l'utilisateur
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${Auth}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const updatedUser = await response.json();
        setUserInfo(updatedUser);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    if(!Auth){
        return(
            <div>
                <h1>Profil</h1>
                <p>Connecté-vous</p>
            </div>
        )
    } 
    return(
        <div>
            <h1>Profil</h1>
            <p>Connecté </p>
            <p>{username}</p>
            <p>{email}</p>
            <p>{desc}</p>
            <form onSubmit={handleUpdate}>
            <div>
              <label>Nom d'utilisateur:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>description:</label>
              <input
                type="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit">Mettre à jour</button>
          </form>
        </div>
    )

}
export default Profil