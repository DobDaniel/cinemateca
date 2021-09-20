import React, { useEffect, useState } from "react";
import SearchView from "./SearchView";
import "./SearchBar.css";
import { Link } from "react-router-dom";
const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState({});
    const [active, setActive] = useState(true);
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
    const getMovies = async (URL) => {
        const resp = await fetch(URL);
        const respJson = await resp.json();
        let list = respJson.results;
        sortList(list);
        console.log(list);
        setMovies(list);
    };
    useEffect(() => {
        const baseURL =
            "https://api.themoviedb.org/3/search/multi?with_keywords=die?sort_by=vote_average.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&query=";
        const URL = baseURL + search;
        getMovies(URL);
    }, [search]);
    return (
        <div>
            <form className="form" action="/" method="get">
                <label htmlFor="header-search"></label>
                <input
                    type="text"
                    className="form-label"
                    id="header-search"
                    placeholder="Search movie"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        console.log(e.target.value);
                        if (e.target.value) setActive(false);
                        else setActive(true);
                    }}
                />
            </form>

            <SearchView popular={active} movies={movies} />
        </div>
    );
};

export default SearchBar;
