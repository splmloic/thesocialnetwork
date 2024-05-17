import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function ShowPost() {
  const [posts, setPosts] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    fetch('http://localhost:1337/api/posts?populate=*&sort=id:desc', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.error('Error fetching posts:', error));
  }, [token]);

  return (
    <div>
      <h2>Liste des posts</h2>
      {posts.data && posts.data.length > 0 ? (
        <ul>
          {posts.data.map((post) => (
            <li key={post.id}>
                <p>Post de {post.attributes.users_permissions_user.data.attributes.username}</p>
              <p>{post.attributes.text}</p>
              <p>likes : {post.attributes.users_likes.data.length !==  0 ?post.attributes.users_likes.data.length : 0}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun post disponible.</p>
      )}
    </div>
  );
}

export default ShowPost;
