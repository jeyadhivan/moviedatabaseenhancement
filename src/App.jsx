import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieGrid category="popular" />} />
        <Route path="/top-rated" element={<MovieGrid category="top-rated" />} />
        <Route path="/upcoming" element={<MovieGrid category="upcoming" />} />
        <Route
          path="/search/:query"
          element={<MovieGrid category="search" />} 
        />
        <Route path="/MovieDetailsPage/:id" element={<MovieDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
