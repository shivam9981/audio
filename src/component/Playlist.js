import '../App.css';

function Playlist({ files, onPlay }) {
    return (
      <div className="playlist">
        <h2>Playlist</h2>
        {files.map((file, index) => (
          <div key={index} className="playlist-item" onClick={() => onPlay(index)}>
            {file.name}
          </div>
        ))}
      </div>
    );
  }
  

  export default Playlist