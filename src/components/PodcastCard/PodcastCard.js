import React from "react";
import { Link } from "react-router-dom";
import './PodcastCard.css';

const PodcastCard = ({ name, image, author, id }) => {
    return (
        <div className="podcastCard__item">
            <div className="podcastCard__img">
                <img src={image} />
            </div>
            <h3>{name}</h3>
            <p>Author: {author}</p>
            <Link to={{pathname: `/podcast/${id}`, state: {id}}} className="podcastCard__button">Ir al podcast</Link>
        </div>
    )
}

export default PodcastCard;