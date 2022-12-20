import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import PodcastCard from "../../components/PodcastCard/PodcastCard";
import './Home.css';

const Home = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Si la última vez que se hizo una solicitud fue hace menos de un día, no hacemos nada
            const lastFetchTime = localStorage.getItem('lastFetchTime');
            if (lastFetchTime && Date.now() - lastFetchTime < 86400000 && lastFetchTime !== null) {

                const storedData = localStorage.getItem('apiData');
                if (storedData) {
                    setData(JSON.parse(storedData));
                    return;
                }
            } else {
                // Si no tenemos datos almacenados, hacemos una solicitud a la API
                const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
                const json = await response.json();
                const JSONParsedData = JSON.stringify(json);
                const JSONParsedTwo = JSON.parse(JSONParsedData);

                setData(JSONParsedTwo.feed.entry);
                console.log(JSONParsedTwo.feed.entry)
                // Almacenamos los datos en localStorage y actualizamos el tiempo de la última solicitud en localStorage
                localStorage.setItem('apiData', JSON.stringify(JSONParsedTwo.feed.entry));
                localStorage.setItem('lastFetchTime', Date.now());
            }
        }

        fetchData();
    }, []);

    const filterPodcast = (e) => {
        const storedData = localStorage.getItem('apiData');
        const JSONParsedData = JSON.parse(storedData);

        const filteredArray = JSONParsedData.filter(item => {
            return item['im:artist'].label.toLowerCase().includes(e.target.value) || item['im:name'].label.toLowerCase().includes(e.target.value);
        });
        setData([...filteredArray]);
    }

    return (
        <>
            <div id="podcast__filter">
                <p>{data.length}</p>
                <input type="text" placeholder="Filter podcasts..." onChange={(e) => filterPodcast(e)}></input>
            </div>
            <div id="podcast__list">
                {data?.map((item) => (
                    <PodcastCard
                        key={item.id.attributes['im:id']}
                        image={item['im:image'][0].label}
                        author={item['im:artist'].label}
                        name={item['im:name'].label} />
                ))}
            </div>
        </>
    );

}

export default Home;