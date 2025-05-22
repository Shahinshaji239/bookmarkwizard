import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";

function ListPost() {
    const userEmail = useSelector((store) => store.auth.user?.email);
    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const navigate = useNavigate();

    const getPostsKey = (email) => `posts_${email}`;

    useEffect(() => {
        if (!userEmail) {
            navigate("/");
            return;
        }
        fetchPosts();
    }, [userEmail, navigate]);

    function fetchPosts() {
        const postsKey = getPostsKey(userEmail);
        const storedPosts = JSON.parse(localStorage.getItem(postsKey)) || [];
        setAllPosts(storedPosts);
        setFilteredPosts(storedPosts);
    }

    function handleSearch(event) {
        event.preventDefault();
        if (searchTerm.trim() === "") {
            setFilteredPosts(allPosts);
        } else {
            const filteredItems = allPosts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filteredItems);
        }
        setCurrentPage(1);
    }

    function handleDelete(index) {
        if (window.confirm("Are you sure you want to delete this post?")) {
            const postsKey = getPostsKey(userEmail);
            const updatedPosts = allPosts.filter((_, i) => i !== index);
            localStorage.setItem(postsKey, JSON.stringify(updatedPosts));
            setAllPosts(updatedPosts);
            setFilteredPosts(updatedPosts);

            if (currentPosts.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    function nextPage() {
        if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div
            className="vh-100 text-light wizard-bg"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1618005198919-d3d4b3f8d666?auto=format&fit=crop&w=1600&q=80")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "'Cinzel', serif",
                color: "#fff",
                minHeight: "100vh"
            }}
        >
            <Navbar />
            <div className="container mt-5 p-4 bg-dark bg-opacity-75 rounded shadow-lg border border-light">
                <div className="text-center mb-4">
                    <h2 className="text-warning display-5">🧙‍♂️ Spellbound Bookmarks</h2>
                </div>

                <div className="mb-4">
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="form-control me-2 bg-transparent border-warning text-white"
                            placeholder="Search magical scrolls..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-warning shadow" type="submit">
                            🔍 Search
                        </button>
                    </form>
                </div>

                <div className="d-flex justify-content-end mb-4">
                    <Link to="/blog/posts/create" className="btn btn-outline-light border-2 shadow">
                        ✨ Add Spell
                    </Link>
                </div>

                {currentPosts.length === 0 ? (
                    <p className="text-center text-muted">No scrolls found in the library.</p>
                ) : (
                    <div className="row g-4">
                        {currentPosts.map((post, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card text-bg-dark border border-warning h-100 shadow">
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="card-title text-warning">📜 {post.title}</h5>
                                            <p className="card-text"><small>{post.addedAt}</small></p>
                                        </div>
                                        <div className="d-flex justify-content-between mt-3">
                                            <Link to={`/blog/posts/${post.id}`} className="btn btn-outline-info btn-sm">
                                                View
                                            </Link>
                                            <Link to={`/blog/posts/${index}/edit`} className="btn btn-outline-primary btn-sm">
                                                Edit
                                            </Link>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(index)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredPosts.length > postsPerPage && (
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button
                            className="btn btn-outline-light"
                            onClick={prevPage}
                            disabled={currentPage === 1}
                        >
                            ◀ Previous
                        </button>
                        <span className="text-light">
                            Page {currentPage} of {Math.ceil(filteredPosts.length / postsPerPage)}
                        </span>
                        <button
                            className="btn btn-outline-light"
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                        >
                            Next ▶
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default checkAuth(ListPost);
