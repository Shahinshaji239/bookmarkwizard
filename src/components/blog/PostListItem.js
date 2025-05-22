import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostListItem(props) {
  const userEmail = useSelector((store) => store.auth.user?.email);
  const getPostsKey = (email) => `posts_${email}`;

  function deletePost() {
    if (!userEmail) {
      alert("User not authenticated");
      return;
    }

    const postsKey = getPostsKey(userEmail);
    let posts = JSON.parse(localStorage.getItem(postsKey)) || [];

    let updatedPosts = posts.filter(post => post.id !== props.post.id);
    localStorage.setItem(postsKey, JSON.stringify(updatedPosts));
    alert("Post deleted successfully!");
    props.refresh();
  }

  return (
    <div className="bg-transparent">
      <div className="container py-2">
        <div className="card shadow-sm border border-secondary bg-light">
          <div className="card-body">
            <h5 className="card-title text-dark fw-bold">📌 {props.post.title}</h5>
            <p className="card-text">
              <a
                href={props.post.content}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-primary"
              >
                {props.post.content}
              </a>
            </p>
            <div className="d-flex justify-content-end gap-2">
              <Link
                to={`/blog/posts/${props.post.id}/edit`}
                className="btn btn-outline-primary btn-sm"
              >
                ✏️ Edit
              </Link>
              <Link
                to={`/view-post/${props.post.id}`}
                className="btn btn-outline-info btn-sm"
              >
                🔍 View
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={deletePost}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostListItem;