import React from "react";
import './PodcastCard.css';

const PodcastCard = ({ name, image, author }) => {
    return (
        <div className="podcastCard__item">
            <div className="podcastCard__img">
                <img src={image} />
            </div>
            <h3>{name}</h3>
            <p>Author: {author}</p>
        </div>
    )
}

export default PodcastCard;