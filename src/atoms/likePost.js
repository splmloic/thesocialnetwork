import { atom } from 'jotai';
import Cookies from 'js-cookie';
import { postsAtom, refreshAtom } from './getPost';
import { userAtom } from './getUser';

export const likeAtom = atom(
  null,
  async (get, set, postId) => {
    const token = Cookies.get("token");
    const user = get(userAtom);

    if (!postId || !user.value.id) {
      console.error("Post ID or User ID is missing");
      console.log(postId);
      console.log(user.value.id);
      return;
    }

    console.log("Liking post with ID:", postId);

    try {
      const response = await fetch(`http://localhost:1337/api/posts/${postId}?populate=*`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            users_likes: [{ id: user.value.id }]
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response text:', errorText);
        throw new Error('Failed to like the post');
      }

      const updatedPost = await response.json();
      set(refreshAtom, (prev) => prev + 1);

    } catch (error) {
      console.error("Error liking the post:", error);
    }
  }
);
