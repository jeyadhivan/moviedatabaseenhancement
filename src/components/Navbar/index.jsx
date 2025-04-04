import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar">
      <h1>movieDB</h1>
      <Link to="/">Popular</Link>
      <Link to="/top-rated">Top Rated</Link>
      <Link to="/upcoming">Upcoming</Link>
      <input
        type="text"
        placeholder="Search for movies"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleSearchKeyPress}
      />
      <button type="button" onClick={handleSearchClick}>
        Search
      </button>
    </nav>
  );
};

export default Navbar;
