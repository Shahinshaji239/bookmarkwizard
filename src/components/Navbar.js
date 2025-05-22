import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logout() {
    if (user) {
      try {
        await axios.post(
          "https://demo-blog.mashupstack.com/api/logout",
          {},
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
      } catch (error) {
        console.error("Logout error:", error);
      }
      dispatch(removeUser());
      navigate("/");
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand text-warning fw-bold" to="/">
          🔖 Bookmark Wizard
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center gap-2">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link text-white " + (isActive ? "fw-bold text-warning" : "")
                }
              >
                Home
              </NavLink>
            </li>

            {user && (
              <li className="nav-item">
                <NavLink
                  to="/blog/posts"
                  className={({ isActive }) =>
                    "nav-link text-white " + (isActive ? "fw-bold text-warning" : "")
                  }
                >
                  📚 My Bookmarks
                </NavLink>
              </li>
            )}

            {!user && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/auth/register"
                    className={({ isActive }) =>
                      "nav-link text-white " + (isActive ? "fw-bold text-warning" : "")
                    }
                  >
                    ✍️ Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      "nav-link text-white " + (isActive ? "fw-bold text-warning" : "")
                    }
                  >
                    🔐 Login
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <li className="nav-item">
                <span
                  className="nav-link text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={logout}
                >
                  🚪 Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;