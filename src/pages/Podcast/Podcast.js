import React, { useEffect, useState } from "react";
import './Podcast.css';
import { useParams } from "react-router";
import { Link } from "react-router-dom";


const Podcast = () => {
    let { id } = useParams();
    const [podcastData, setPodcastData] = useState([]);
    const [podcastTracks, setPodcastTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingTracks, setLoadingTracks] = useState(true);

    useEffect(() => {

        async function fetchData() {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=100`)}`);
            const json = await response.json();
            const JSONParsedData = JSON.parse(json.contents);
            console.log(JSONParsedData['results']);
            setPodcastTracks(JSONParsedData['results']);
        }

        const storedData = localStorage.getItem('apiData');
        const JSONParsedData = JSON.parse(storedData);
        const podcast = JSONParsedData.find((el) => el.id.attributes['im:id'] === id);
        console.log(podcast)
        setPodcastData(podcast);
        fetchData();
        setLoading(false);
    }, []);


    if (loading) {
        return <div>loading</div>
    }

    const formatTime = (millis) => {
        let sec = Math.floor(millis / 1000);
        let hrs = Math.floor(sec / 3600);
        sec -= hrs * 3600;
        let min = Math.floor(sec / 60);
        sec -= min * 60;

        sec = '' + sec;
        sec = ('00' + sec).substring(sec.length);

        if (hrs > 0) {
            min = '' + min;
            min = ('00' + min).substring(min.length);
            return hrs + ":" + min + ":" + sec;
        }
        else {
            return min + ":" + sec;
        }
    }

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
    }
    return (
        <div id="podcast__page">
            <div id="podcast__info">
                <img src={podcastData['im:image'][2].label} />
                <hr />
                <div id="podcast__info--name">
                    <h3>{podcastData['im:name'].label}</h3>
                    <p>by {podcastData['im:artist'].label}</p>
                </div>
                <hr />
                <div id="podcast__info--description">
                    <h4>Description:</h4>
                    <p>{podcastData['summary'].label}</p>
                </div>
            </div>
            <div id="podcast__playlist">
                { }
                <div id="podcast__playlist--episodes">
                    <h3>Episodes: {podcastTracks.length}</h3>
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
                                <td><Link className="podcast__playlist--link" to={'/'}>{el.trackName}</Link></td>
                                <td>{formatDate(el.releaseDate)}</td>
                                <td>{formatTime(el.trackTimeMillis)}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Podcast;