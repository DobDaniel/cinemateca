import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./DetailsPerson.css";
import HomeLink from "./HomeLink";
import Movie from "./Movie";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const APIURL = "https://api.themoviedb.org/3/person/";
const APIKEY = "?api_key=04c35731a5ee918f014970082a0088b1&page=1";
const DetailsPerson = ({ match }) => {
    const [person, setPerson] = useState({});
    const [credits, setCredits] = useState([]);
    const [bests, setBests] = useState([]);
    const currentPersonID = match.params.personID;
    function sortListAverage(list) {
        if (!list) return;
        for (let i = 0; i < 20; i++)
            for (let j = i + 1; j < 20; j++) {
                if (
                    list[i] &&
                    list[j] &&
                    list[i].vote_average * list[i].vote_count <
                        list[j].vote_average * list[j].vote_count
                ) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
    }
    function sortListPop(list) {
        if (!list) return;
        for (let i = 0; i < 20; i++)
            for (let j = i + 1; j < 20; j++) {
                if (
                    list[i] &&
                    list[j] &&
                    list[i].popularity < list[j].popularity
                ) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
    }
    async function getPerson(ID) {
        const url = APIURL + ID + APIKEY;
        const resp = await fetch(url);
        const respJson = await resp.json();

        const oldbio = respJson.biography;
        const newbio = shortenBio(oldbio);
        respJson.biography = newbio;

        setPerson(respJson);
        console.log(person);
    }
    async function getCredits(ID) {
        const url = APIURL + ID + "/movie_credits" + APIKEY;
        const resp = await fetch(url);
        const respJson = await resp.json();
        // console.log(person);
        let list;
        // if ((person.known_for_department = "Directing")) {
        //     list = respJson.crew;
        // } else {
        //     list = respJson.cast;
        // }
        const crew = respJson.crew;
        const cast = respJson.cast;
        let crewLen = Object.keys(crew).length;
        let castLen = Object.keys(cast).length;
        if (crewLen > castLen) list = crew;
        else list = cast;
        sortListPop(list);
        let len = Object.keys(list).length;
        for (let i = 10; i < len; i++) delete list[i];

        setCredits(list);
    }

    async function getBests(ID) {
        const url = APIURL + ID + "/movie_credits" + APIKEY;
        const resp = await fetch(url);
        const respJson = await resp.json();
        let list;

        // if ((person.known_for_department = "Directing")) {
        //     list = respJson.crew;
        // } else {
        //     list = respJson.cast;
        // }
        const crew = respJson.crew;
        const cast = respJson.cast;
        let crewLen = Object.keys(crew).length;
        let castLen = Object.keys(cast).length;
        if (crewLen > castLen) list = crew;
        else list = cast;
        sortListAverage(list);
        var len = Object.keys(list).length;
        for (let i = 10; i < len; i++) delete list[i];

        setBests(list);
        console.log(bests);
    }
    function shortenBio(bio) {
        var con = 0;
        var last = bio.length;
        for (let i = 0; i < bio.length; i++) {
            if (bio[i] == ".") con = con + 1;
            if (con == 5) {
                last = i;
                break;
            }
        }
        var newBio = bio.slice(0, last + 1);
        return newBio;
    }
    useEffect(() => {
        getPerson(currentPersonID);
        getCredits(currentPersonID);
        getBests(currentPersonID);
    }, []);

    return (
        <div>
            <HomeLink />
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
                            src={IMGPATH + person.profile_path}
                        />
                    </div>
                    <div className="movie-info">
                        <p className="movie-title">{person.title}</p>
                        <div className="movie-overview">
                            <p>{person.biography}</p>
                        </div>
                    </div>
                </div>
                <div className="person-movies">
                    <div className="person-know">
                        <p>Known for:</p>
                        {Object.keys(credits).length !== 0 && (
                            <Movie movies={credits} />
                        )}
                    </div>
                    <div className="person-know">
                        <p>Best in:</p>
                        {Object.keys(bests).length !== 0 && (
                            <Movie movies={bests} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPerson;
