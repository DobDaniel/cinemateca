import React, { useEffect } from "react";
import HomeLink from "./HomeLink";
import Popular from "./Popular";
import SearchBar from "./SearchBar";
import SearchView from "./SearchView";

const MainView = () => {
    useEffect(() => {
    }, []);
    return (
        <div>
            <HomeLink/>
            <SearchBar />
        </div>
    );
};

export default MainView;
