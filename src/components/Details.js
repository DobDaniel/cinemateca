import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFetch } from "react-hooks-fetch";
import { Link } from "react-router-dom";
import "./Details.css";
import HomeLink from "./HomeLink";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const APIURL = "https://api.themoviedb.org/3/movie/";
const APIKEY = "?api_key=04c35731a5ee918f014970082a0088b1&page=1";
const Details = ({ match }) => {
    const [movie, setMovie] = useState({});
    const [actors, setActors] = useState({});
    const [director, setDirector] = useState("");
    const currentMovieID = match.params.movieID;
    const options = {};

    // var actors = {};
    function streamMovie() {
        let url = "https://dogeflix.net/newmov.php?menu=search&query=";
        let title = movie.title;
        let modTitle = title.replace(/ /g, "+");
        let newUrl = url + modTitle;
        window.open(newUrl, "_blank").focus();
    }
    async function getMovie() {
        const url = APIURL + currentMovieID + APIKEY;
        const resp = await fetch(url);
        const respJson = await resp.json();
        setMovie(respJson);
    }
    async function getActors() {
        const url = APIURL + currentMovieID + "/credits" + APIKEY;
        const resp = await fetch(url);
        const respJson = await resp.json();
        const cast = respJson.cast;
        var len = Object.keys(cast).length;
        for (let i = 4; i < len; i++) {
            delete cast[i];
        }

        setActors(cast);
    }
    async function getDirector() {
        const url = APIURL + currentMovieID + "/credits" + APIKEY;
        const resp = await fetch(url);

        const respJson = await resp.json();

        const crew = respJson.crew;
        var len = Object.keys(crew).length;
        var director;
        for (let i = 0; i < len; i++) {
            if ((crew[i].job = "Director")) {
                director = crew[i];
                break;
            }
        }
        setDirector(director);
    }

    let isgood = false;
    useEffect(() => {
        getMovie();
        getActors();
        getDirector();
    }, []);

    return (
        <div>
            <HomeLink/>
            <div className="detail-wrapper">
                <button
                    className="detail-button"
                    onClick={() => window.history.back()}
                >
                    {" "}
                    &#8592;{" "}
                </button>
                <div className="movie-layout">
                    <div className="detail-movie-poster">
                        <img
                            className="detail-movie-image"
                            src={IMGPATH + movie.poster_path}
                        />
                    </div>
                    <div className="movie-info">
                        <p className="movie-title">{movie.title}</p>
                        <div className="movie-overview">
                            <p>{movie.overview}</p>
                        </div>
                        <div className="bottom-part">
                            <div className="movie-crew">
                                <div className="directors">
                                    <p className="director">
                                        Directed by:
                                        <Link
                                            className="director-link"
                                            to={`/person/${director.id}`}
                                        >
                                            {" " + director.name}
                                        </Link>
                                    </p>
                                </div>
                                <div className="actors">
                                    <p className="actors">
                                        Actors:
                                        {Object.keys(actors).length !== 0 &&
                                            actors.map((actor) => (
                                                <Link
                                                    className="actor-link"
                                                    to={`/person/${actor.id}`}
                                                >
                                                    <p className="actor-link-text">
                                                        {actor.name}
                                                    </p>
                                                </Link>
                                            ))}
                                    </p>
                                </div>
                            </div>
                            <div className="bottom-end">
                                <div className="movie-vote">
                                    <p className="movie-vote-text">
                                        {movie.vote_average}
                                    </p>
                                </div>
                                <button
                                    class="stream-button"
                                    onClick={streamMovie}
                                >
                                    Stream Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
