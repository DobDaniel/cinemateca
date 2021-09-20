import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";
import failedIMG from "../assets/failedIMG.jpg";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const Movie = ({ movies }) => {
    function addDefaultSrc(e) {
        e.target.src =
            "https://www.vinelanddriveintheater.com/assets/admin/img/addmovie.jpg";
        e.target.onerror = null;
    }
    function getLink(movie) {
        if (movie.profile_path) return `/person/${movie.id}`;
        else if (movie.video != null) return `/movie/${movie.id}`;
        else return `/show/${movie.id}`;
    }
    return (
        <div className="movie-wrapper">
            <div className="movie-grid">
                {movies &&
                    movies.map((movie) => (
                        <div className="movie-container" key={movie.id}>
                            {/* <div className="movie-info">
                            <p>{movie.title}</p>
                        </div> */}
                            <div className="movie-poster">
                                <Link to={getLink(movie)}>
                                    <img
                                        className="movie-image"
                                        src={
                                            IMGPATH +
                                            (movie.poster_path ||
                                                movie.profile_path)
                                        }
                                        onError={addDefaultSrc}
                                    />
                                </Link>
                            </div>
                            {/* <div className="movie-overview">
                            <p>{movie.overview}</p>
                        </div>
                        <div className="movie-vote">
                            <p>{movie.vote_average}</p>
                        </div> */}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Movie;
