import React from "react";
import { useEffect, useState } from "react";
import Movie from "./Movie";
import "./Popular.css";
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const Popular = () => {
    const [movies, setMovies] = useState([]);
    function sortList(list) {
        if (!list) return;
        for (let i = 0; i < 20; i++)
            for (let j = i + 1; j < 20; j++) {
                if (
                    list[i] &&
                    list[j] &&
                    list[i].popularity *
                        list[i].vote_average *
                        list[i].number_votes <
                        list[j].popularity *
                            list[j].vote_average *
                            list[i].number_votes
                ) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
    }
    async function getMovies(url) {
        const resp = await fetch(url);
        const respJson = await resp.json();
        let list = respJson.results;
        sortList(list);
        setMovies(list);
    }
    useEffect(() => {
        getMovies(APIURL);
    }, []);
    return (
        <div>
            <p className="section-title">Most Popular Films: </p>
            <div className="movie-grid">
                <Movie movies={movies} />
            </div>
        </div>
    );
};

export default Popular;
