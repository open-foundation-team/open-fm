// Component imports
import { useEffect, useState } from "react";
import { PlayerControls, Sidebar } from "./components";

// Sound / mood imports
import { moods } from "./library";


// Application declaration
const App = () => {

  const [isPlaying, setPlaying] = useState(false);

  const [mood, setMood] = useState(0);
  const [playlist, setPlaylist] = useState(0);
  const [song, setSong] = useState(0);

  const nowPlaying = {
    song: moods[mood].playlists[playlist].songs[song],
    playlist: moods[mood].playlists[playlist]
  };

  useEffect(() => {
    setPlaylist(0);
  }, [mood]);

  useEffect(() => {
    setSong(0);
  }, [playlist]);

  const songControl = (action: 'next' | 'prev') => {
    if (action === 'next' && song !== moods[mood].playlists[playlist].songs.length - 1) setSong(prev => prev + 1);
    if (action === 'next' && song === moods[mood].playlists[playlist].songs.length - 1) setSong(0);
    if (action === 'prev' && song !== 0) setSong(prev => prev - 1);
    if (action === 'prev' && song === 0) setSong(0);
  };

  return (
    <main className="app-container">
      <Sidebar
        moods={moods}
        selectedMood={mood}
        selectedPlaylist={playlist}
        selectedSong={song}
        updateMood={setMood}
        updatePlaylist={setPlaylist}
        updateSong={setSong}
      />
      <PlayerControls
        isPlaying={isPlaying}
        nowPlaying={nowPlaying}
        setPlaying={setPlaying}
        songControl={songControl}
      />
    </main>
  );
};

// Application export
export default App;
