import React from "react";
import { Link } from "react-router-dom";
import "./HomeLink.css";
const HomeLink = () => {
    return (
        <div>
            <div className="link-wrap">
                <Link className="link-home" to={`/cinemateca`}>
                    <p>cinemateca</p>
                </Link>
            </div>
        </div>
    );
};

export default HomeLink;
