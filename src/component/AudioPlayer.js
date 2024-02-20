import React, {useEffect , useRef} from "react";
import '../App.css';


function AudioPlayer({ src, onEnded }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    audio.pause();
    audio.src = src;
    audio.play().catch((error) => {
      console.error('Error playing audio:', error.message);
    });
 
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('ended', onEnded);
    };
  }, [onEnded]);

  return (
    <audio controls ref={audioRef}>
      Your browser does not support the audio element.
    </audio>
  );
}

export default AudioPlayer