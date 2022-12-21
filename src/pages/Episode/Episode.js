/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './Episode.css';
import { useParams } from 'react-router';
import Spinner from '../../components/Spinner/Spinner';

function Episode({ setTrack, setLoadingNav }) {
  const { id, episodeId } = useParams();
  const [podcastData, setPodcastData] = useState([]);
  const [episodeData, setEpisodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTracks, setLoadingTracks] = useState(true);

  useEffect(() => {
    setLoadingNav(true);
    async function fetchData() {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=100`
        )}`
      );
      const json = await response.json();
      const JSONParsedData = JSON.parse(json.contents);
      const episode = JSONParsedData.results.find(
        (el) => el.trackId.toString() === episodeId
      );
      setEpisodeData(episode);
      setLoadingTracks(false);
      setLoadingNav(false);
    }

    const storedData = localStorage.getItem('apiData');
    const JSONParsedData = JSON.parse(storedData);
    const podcast = JSONParsedData.find(
      (el) => el.id.attributes['im:id'] === id
    );
    setPodcastData(podcast);
    fetchData();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  const playEpisode = () => {
    setTrack({
      urlAudio: episodeData.episodeUrl,
      name: episodeData.trackName,
      image: episodeData.artworkUrl60
    });
  };

  return (
    <div id="podcast__page">
      <div id="podcast__info">
        <img src={podcastData['im:image'][2].label} alt="episode" />
        <hr />
        <div id="podcast__info--name">
          <h3>{podcastData['im:name'].label}</h3>
          <p>by {podcastData['im:artist'].label}</p>
        </div>
        <hr />
        <div id="podcast__info--description">
          <h4>Description:</h4>
          <p>{podcastData.summary.label}</p>
        </div>
      </div>
      <div id="episode__description">
        {loadingTracks === true ? (
          <div id="episode__description--loading">
            <Spinner />
            <h4>Loading episode...</h4>
          </div>
        ) : (
          <div id="episode__description--episode">
            <h3>{episodeData.trackName}</h3>
            <p dangerouslySetInnerHTML={{ __html: episodeData.description }} />
            <button
              className="episode__description--button"
              type="button"
              onClick={() => playEpisode()}
            >
              Play episode
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Episode;
