import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./DetailsShow.css";
import HomeLink from "./HomeLink";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const APIURL = "https://api.themoviedb.org/3/tv/";
const APIKEY = "?api_key=04c35731a5ee918f014970082a0088b1&page=1";
const DetailsShow = ({ match }) => {
    const [show, setShow] = useState({});
    const [actors, setActors] = useState({});
    const currentShowID = match.params.showID;

    function streamShow() {
        let url = "https://dogeflix.net/newmov.php?menu=searchshow&query=";
        let title = show.name;

        let modTitle = title.replace(/ /g, "+");
        let newUrl = url + modTitle;
        window.open(newUrl, "_blank").focus();
    }
    async function getShow(ID) {
        const url = APIURL + ID + APIKEY;
        const resp = await fetch(url);
        const respJson = await resp.json();
        setShow(respJson);
        console.log(respJson);
    }
    async function getActors() {
        const url = APIURL + currentShowID + "/credits" + APIKEY;
        const resp = await fetch(url);
        const respJson = await resp.json();
        const cast = respJson.cast;
        var len = Object.keys(cast).length;
        for (let i = 4; i < len; i++) {
            delete cast[i];
        }

        setActors(cast);
    }

    useEffect(() => {
        getShow(currentShowID);
        getActors(currentShowID);
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
                            src={IMGPATH + show.poster_path}
                        />
                    </div>
                    <div className="movie-info">
                        <p className="movie-title">{show.title}</p>
                        <div className="movie-overview">
                            <p>{show.overview}</p>
                        </div>
                        <div className="bottom-part">
                            <div className="movie-crew">
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
                                        {show.vote_average}
                                    </p>
                                </div>
                                <button
                                    class="stream-button"
                                    onClick={streamShow}
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

export default DetailsShow;
