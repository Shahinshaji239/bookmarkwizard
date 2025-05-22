import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Viewpost() {
  const { postId } = useParams();
  const userEmail = useSelector((store) => store.auth.user?.email);
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    if (!userEmail) {
      alert("User not authenticated.");
      navigate("/");
      return;
    }

    const postsKey = `posts_${userEmail}`;
    let storedPosts = JSON.parse(localStorage.getItem(postsKey)) || [];

    let updated = false;
    storedPosts = storedPosts.map((p) => {
      if (!p.id) {
        p.id = uuidv4();
        updated = true;
      }
      return p;
    });

    if (updated) {
      localStorage.setItem(postsKey, JSON.stringify(storedPosts));
    }

    const foundPost = storedPosts.find((p) => p.id.toString() === postId);

    if (foundPost) {
      setPost(foundPost);
    } else {
      alert("Post not found.");
    }
  }, [postId, userEmail, navigate]);

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
      <div className="container p-4 mt-5 bg-white rounded shadow-lg">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-success text-white">
                <h3>{post.title}</h3>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <strong>URL:</strong>{" "}
                  <a
                    href={post.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-underline text-primary"
                  >
                    {post.content}
                  </a>
                </p>
                <div className="mt-4">
                  <Link to="/blog/posts" className="btn btn-secondary">
                    Back to Posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewpost;