import React, { useState,useEffect } from "react";
import Cookies from "js-cookie";

function NewPost() {
  const [post, setPost] = useState("");
  const [userId,setUserId]=useState(null);
  const [send,setSend]=useState(false);
  const token = Cookies.get("token");

  useEffect(()=>{
    fetch('http://localhost:1337/api/users/me',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data=> {setUserId(data.id)})
    .then(setSend(false))
  },[send,token])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        data:{
            text: post,
            users_permissions_user: userId
        }
    };
    
    try {
      const response = await fetch('http://localhost:1337/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setPost("");
        setSend(true);
        const responseData = await response.json();
        console.log('Post added:', responseData);
      } else {
        console.error('Error adding post:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div>
      <h2>Ajoutez un post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Votre message : </label>
          <textarea
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewPost;
