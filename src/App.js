import React, { useState, useEffect } from 'react';
import './App.css';
import AudioPlayer from './component/AudioPlayer';
import Playlist from './component/Playlist';

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist'));
    if (savedPlaylist) {
      setPlaylist(savedPlaylist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const handleUpload = (event) => {
    const files = event.target.files;
    const newPlaylist = [...playlist];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPlaylist.push({ name: files[i].name, dataURL: e.target.result });
        setPlaylist(newPlaylist);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleTrackEnded = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Audio Player</h1>
      </header>
      <input type="file" accept="audio/mp3" className='upload-btn'  multiple onChange={handleUpload} />
      <Playlist files={playlist} onPlay={handlePlay} />
      {playlist.length > 0 && (
        <AudioPlayer
          src={playlist[currentTrackIndex].dataURL}
          onEnded={handleTrackEnded}
        />
      )}
    </div>
  );
}

export default App;
