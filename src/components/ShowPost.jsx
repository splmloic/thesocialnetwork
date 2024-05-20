import React from "react";
import { NavLink } from 'react-router-dom';
import {useAtom} from 'jotai'
import { postsAtom } from "../atoms/getPost";
import Cookies from "js-cookie";

function ShowPost() {
  const token = Cookies.get("token");
  const [posts] = useAtom(postsAtom);

  const handleLike = async (postId) => {
    const data = {
          like: postId,
          users_likes: token
      }

    try {
      const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  };

  return (
    <div>
      <h2>Liste des posts</h2>
      {posts.data && posts.data.length > 0 ? (
        <ul>
          {posts.data.map((post) => (
            <li key={post.id}>
                <p>Post de <NavLink to={`/profil/${post.attributes.users_permissions_user.data.attributes.username}`}>{post.attributes.users_permissions_user.data.attributes.username}</NavLink></p>
              <p>{post.attributes.text}</p>
              <p>likes : {post.attributes.users_likes.data.length !==  0 ?post.attributes.users_likes.data.length : 0}</p>
              <button onClick={() => handleLike(post.id)}>Like</button>
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
