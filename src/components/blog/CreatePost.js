import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userEmail = useSelector((store) => store.auth.user?.email);

  const getPostsKey = (email) => `posts_${email}`;

  const isValidTitle = (value) => /^[A-Za-z\s]{1,50}$/.test(value);
  const isValidURL = (value) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };

  const addPost = () => {
    if (!userEmail) {
      navigate("/");
      return;
    }

    const postsKey = getPostsKey(userEmail);
    const storedPosts = JSON.parse(localStorage.getItem(postsKey)) || [];

    const today = new Date().toISOString().split("T")[0];
    const todaysPosts = storedPosts.filter(post => post.date === today);

    if (todaysPosts.length >= 5) {
      setError("You can only add up to 5 bookmarks per day!");
      return;
    }

    if (!isValidTitle(title.trim())) {
      setError("Title must contain only letters and spaces!");
      return;
    }

    if (!isValidURL(content.trim())) {
      setError("Please enter a valid URL!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      addedAt: new Date().toLocaleString(),
      date: today,
    };

    const updatedPosts = [...storedPosts, newPost];
    localStorage.setItem(postsKey, JSON.stringify(updatedPosts));
    navigate("/blog/posts");
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1581091870633-3148046a9833?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <div className="container p-4 mt-5 bg-white bg-opacity-90 rounded shadow" style={{ maxWidth: "700px" }}>
        <h2 className="text-center mb-4 fw-semibold text-success">📌 Add a New Bookmark</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group mb-3">
          <label htmlFor="postTitle" className="form-label">Title</label>
          <input
            id="postTitle"
            type="text"
            className="form-control"
            placeholder="Enter the URL title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="postContent" className="form-label">URL</label>
          <input
            id="postContent"
            type="url"
            className="form-control"
            placeholder="Enter the bookmark URL"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="text-end">
          <button className="btn btn-dark btn-lg shadow" onClick={addPost}>
            Add Bookmark
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;