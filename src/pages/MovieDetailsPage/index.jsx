import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getMovieDetails, getMovieCast} from '../../services/api'
import './index.css'

const transformMovieData = movie => ({
  id: movie.id,
  title: movie.title,
  posterPath: movie.poster_path,
  voteAverage: movie.vote_average,
  overview: movie.overview,
  genres: movie.genres.map(genre => genre.name).join(', '),
  releaseDate: movie.release_date,
})

const transformCastData = cast =>
  cast.map(actor => ({
    id: actor.id,
    name: actor.name,
    profilePath: actor.profile_path,
    character: actor.character,
  }))

const MovieDetailsPage = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      const movieData = await getMovieDetails(id)
      const castData = await getMovieCast(id)
      console.log(castData)

      setMovie(transformMovieData(movieData))
      setCast(transformCastData(castData))
    }
    fetchDetails()
  }, [id])

  if (!movie) return <div className="loading">Loading...</div>

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="rating">⭐ {movie.voteAverage} / 10</p>
          <p className="genres">
            <strong>Genres:</strong> {movie.genres}
          </p>
          <p className="release-date">
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>

      <h3 className="cast-head">Cast</h3>
      <div className="cast-list">
        {cast.map(actor => (
          <div key={actor.id} className="cast-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profilePath}`}
              alt={actor.name}
            />
            <p>
              {actor.name} <br />
              AS <br />
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieDetailsPage
