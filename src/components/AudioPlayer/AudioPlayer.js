/* eslint-disable react/prop-types */
import React from 'react';
import './AudioPlayer.css';

function AudioPlayer({ data }) {
  return (
    <div id="audioplayer__page">
      <div id="audioplayer__info">
        <img src={data.image} alt="capitule" />
        <p>{data.name}</p>
      </div>
      <audio src={data?.urlAudio} controls autoPlay>
        <track
          src={data?.urlAudio}
          kind="captions"
          srcLang="en"
          label="english_captions"
        />
      </audio>
    </div>
  );
}

export default AudioPlayer;
