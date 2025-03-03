import { loadReproductionData, saveReproductionData } from '@/services/localStorageService';
import { PropsPlayingType } from '@/types/types';
import React, { useEffect, useRef, useState } from 'react';

function CurrentRadioPlaying({ currentRadioPlaying }: PropsPlayingType) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    const datareproduction = loadReproductionData();
    console.log(datareproduction);
    
    const savedVolume = datareproduction.volume || 1;
    setVolume(savedVolume);

    if (audioRef.current) {
      audioRef.current.volume = savedVolume;
    }
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    saveReproductionData({ volume: newVolume });

    if (audioRef.current) {
      audioRef.current.volume = newVolume; 
    }
  };

  useEffect(() => {
    if (currentRadioPlaying && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentRadioPlaying, volume]);

  return (
    <div className="current-radio-playing-container">
      <h1 className="title-radio-browser">Radio Browser</h1>
      {currentRadioPlaying ? (
        <div>
          <div className="current-radio-playing">

            <section className="radio-control">
            <audio
              autoPlay
              ref={audioRef}
              src={currentRadioPlaying.url}
            ></audio>
            <button onClick={togglePlayPause}>
              {isPlaying ? (
                <i className="fa fa-pause"></i>
              ) : (
                <i className="fa fa-play"></i>
              )}
            </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
              <span>
                <i className="fa fa-volume-up"></i>
              </span>
            </section>
          </div>
          <p>{currentRadioPlaying.name}</p>
        </div>
      ) : (
        <p>Listen to your favorite radio now!</p>
      )}
    </div>
  );
}

export default CurrentRadioPlaying;
