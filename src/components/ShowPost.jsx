import React from "react";
import { NavLink } from 'react-router-dom';
import {useAtom} from 'jotai'
import { postsAtom } from "../atoms/getPost";
import { likeAtom } from "../atoms/likePost";
import { userAtom } from '../atoms/getUser';

import Cookies from "js-cookie";

function ShowPost() {
  const token = Cookies.get("token");
  const [posts] = useAtom(postsAtom);
  const [, likePost] = useAtom(likeAtom);
  const [user] = useAtom(userAtom); 

  const handleLike = async (postId) => {
    await likePost(postId);
  };

  return (
    <div>
    {posts.data && posts.data.length > 0 ? (
            <ul className="space-y-4">
                {posts.data.map((post) => (
                    <li key={post.id} className="p-4 bg-slate-100 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-700">
                                Post de <NavLink to={`/profil/${post.attributes.users_permissions_user.data.attributes.username}`} className="text-purple-500 hover:underline">
                                    {post.attributes.users_permissions_user.data.attributes.username}
                                </NavLink>
                            </p>
                            <div className="flex items-center">
                                <p className="mr-4 text-sm text-gray-600">
                                    Likes: {post.attributes.users_likes.data.length || 0}
                                </p>
                                <button onClick={() => handleLike(post.id)} className="px-2 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                                    Like
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-800">{post.attributes.text}</p>
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
