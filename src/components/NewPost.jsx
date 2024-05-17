import React, { useState } from "react";
import Cookies from "js-cookie";

function NewPost() {
  const [post, setPost] = useState("");
  const token = Cookies.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      text: post,
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
