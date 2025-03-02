import { PropsPlayingType } from '@/types/types'
import React, { useEffect, useRef, useState } from 'react'


function CurrentRadioPlaying({currentRadioPlaying}: PropsPlayingType) {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  

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
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    setIsPlaying(true);
  },[currentRadioPlaying])

  
  return (
    <div>
      {currentRadioPlaying ? (
        <div>
          <audio autoPlay ref={audioRef} src={currentRadioPlaying.url}></audio>
          <button onClick={togglePlayPause}>
            {isPlaying ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
          </button>

          <section>
          <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <span>{Math.round(volume * 100)}%</span>
          </section>
          <p>{currentRadioPlaying.name}</p>
        </div>
      ) : (
        <p>Listen to your favorite radio now!</p>
      )}
    </div>
  );
}

export default CurrentRadioPlaying;

