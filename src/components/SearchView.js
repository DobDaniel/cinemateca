import React from "react";
import Movie from "./Movie";
import Popular from "./Popular";
import SearchBar from "./SearchBar";

const SearchView = ({ popular, movies }) => {
    return (
        <div>
            {popular && <Popular />}
            {!popular && <Movie movies={movies} />}
        </div>
    );
};

export default SearchView;
