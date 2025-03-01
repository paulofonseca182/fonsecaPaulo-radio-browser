import { PropsPlayingType } from '@/types/types'
import React from 'react'


function CurrentRadioPlaying({currentRadioPlaying}: PropsPlayingType) {
  return (
    <div>
        {currentRadioPlaying ? (
          <div>
            <audio autoPlay src={currentRadioPlaying.url} controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
            <p>{currentRadioPlaying.name}</p>
          </div>
        ) : <p>Listen to your favorite radio now!</p>}
      </div>
  )
}

export default CurrentRadioPlaying;

