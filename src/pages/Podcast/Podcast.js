/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './Podcast.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

function Podcast({ setLoadingNav }) {
  const { id } = useParams();
  const [podcastData, setPodcastData] = useState([]);
  const [podcastTracks, setPodcastTracks] = useState([]);
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
      setPodcastTracks(JSONParsedData.results);
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
  }, [id]);

  const formatTime = (millis) => {
    let sec = Math.floor(millis / 1000);
    const hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;

    sec = `${sec}`;
    sec = `00${sec}`.substring(sec.length);

    if (hrs > 0) {
      min = `${min}`;
      min = `00${min}`.substring(min.length);
      return `${hrs}:${min}:${sec}`;
    }
    return `${min}:${sec}`;
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div id="podcast__page">
      <div id="podcast__info">
        <img src={podcastData['im:image'][2].label} alt="podcast" />
        <hr />
        <div id="podcast__info--name">
          <h3>{podcastData['im:name'].label}</h3>
          <p>
            by
            {podcastData['im:artist'].label}
          </p>
        </div>
        <hr />
        <div id="podcast__info--description">
          <h4>Description:</h4>
          <p>{podcastData.summary.label}</p>
        </div>
      </div>
      <div id="podcast__playlist">
        {loadingTracks === true ? (
          <div id="podcast__playlist--loading">
            <Spinner />
            <h4>Loading episodes...</h4>
          </div>
        ) : (
          <>
            <div id="podcast__playlist--episodes">
              <h3>
                Episodes:
                {` ${podcastTracks.length}`}
              </h3>
            </div>
            <div id="podcast__playlist--list">
              <table>
                <thead>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                </thead>
                {podcastTracks?.map((el) => (
                  <tr>
                    <td>
                      <Link
                        to={`/podcast/${id}/episode/${el.trackId}`}
                        className="podcast__playlist--link"
                      >
                        {el.trackName}
                      </Link>
                    </td>
                    <td>{formatDate(el.releaseDate)}</td>
                    <td>{formatTime(el.trackTimeMillis)}</td>
                  </tr>
                ))}
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Podcast;
