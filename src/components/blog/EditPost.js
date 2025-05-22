import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";

function EditPost() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userEmail = useSelector((store) => store.auth.user?.email);
  const getPostsKey = (email) => `posts_${email}`;

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
      return;
    }
    const postsKey = getPostsKey(userEmail);
    const posts = JSON.parse(localStorage.getItem(postsKey)) || [];
    const idx = parseInt(postId, 10);

    if (isNaN(idx)) {
      setError("Invalid post identifier!");
      return;
    }

    const postToEdit = posts.find((post, index) => index === idx);

    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    } else {
      setError("Post not found!");
    }
  }, [postId, userEmail, navigate]);

  function updatePost() {
    if (!userEmail) {
      navigate("/");
      return;
    }

    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const nameRegex = /^[a-zA-Z0-9\s]+$/;

    if (!nameRegex.test(title.trim())) {
      setError("Title should only contain letters, numbers, and spaces.");
      return;
    }

    if (!urlRegex.test(content.trim())) {
      setError("Please enter a valid URL.");
      return;
    }

    const postsKey = getPostsKey(userEmail);
    const posts = JSON.parse(localStorage.getItem(postsKey)) || [];
    const idx = parseInt(postId, 10);

    const updatedPosts = posts.map((post, index) =>
      index === idx ? { ...post, title, content } : post
    );

    localStorage.setItem(postsKey, JSON.stringify(updatedPosts));
    alert("Post updated successfully!");
    navigate("/blog/posts");
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1607083201096-3be7b2f4f53e?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container bg-white bg-opacity-90 rounded p-4 shadow-lg" style={{ maxWidth: "700px" }}>
        <h2 className="text-center mb-4 text-success">✏️ Edit Bookmark</h2>

        {error && <p className="alert alert-danger">{error}</p>}

        <div className="form-group mb-3">
          <label htmlFor="postTitle" className="form-label">Title</label>
          <input
            id="postTitle"
            type="text"
            className="form-control"
            placeholder="Enter the bookmark title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setError("");
            }}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="postContent" className="form-label">URL</label>
          <input
            id="postContent"
            type="url"
            className="form-control"
            placeholder="Enter the bookmark URL"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              setError("");
            }}
          />
        </div>

        <div className="text-end">
          <button
            className="btn btn-dark btn-lg"
            onClick={updatePost}
            disabled={!title.trim() || !content.trim()}
          >
            Update Bookmark
          </button>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(EditPost);