/* eslint-disable react-hooks/exhaustive-deps */

// Component imports
import { useEffect, useRef, useState } from "react";
import { MusicPlayer, PlayerControls, Sidebar } from "./components";

// Sound / mood imports
import { moods } from "./library";


// Application declaration
const App = () => {

  const musicRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setPlaying] = useState(false);

  const [mood, setMood] = useState(0);
  const [playlist, setPlaylist] = useState(0);
  const [song, setSong] = useState(0);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setPlaylist(0);
  }, [mood]);

  useEffect(() => {
    setSong(0);
  }, [playlist]);

  // Function to change song
  const songControl = (action: 'next' | 'prev') => {
    if (action === 'next' && song !== moods[mood].playlists[playlist].songs.length - 1) setSong(prev => prev + 1);
    if (action === 'next' && song === moods[mood].playlists[playlist].songs.length - 1) setSong(0);
    if (action === 'prev' && song !== 0) setSong(prev => prev - 1);
    if (action === 'prev' && song === 0) setSong(0);
  };

  // Add listenter to play state of audio ref
  useEffect(() => {
    const audio = musicRef.current;

    audio?.removeEventListener('play', () => setPlaying(true));
    audio?.removeEventListener('pause', () => setPlaying(false));
    audio?.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio?.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));

    audio?.addEventListener('play', () => setPlaying(true));
    audio?.addEventListener('pause', () => setPlaying(false));
    audio?.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio?.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));

    return () => {
      audio?.removeEventListener('play', () => setPlaying(true));
      audio?.removeEventListener('pause', () => setPlaying(false));
      audio?.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio?.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    };
  }, [song]);

  // Update the audio play state
  useEffect(() => {
    const audio = musicRef.current;
    if (isPlaying) audio?.play();
    if (!isPlaying) audio?.pause();
  }, [isPlaying, song]);

  // Action when song has ended
  useEffect(() => {
    console.log('test', currentTime, duration);

    if (currentTime >= duration && duration !== 0) {
      console.log('Song has ended, next song to play', song + 1);
      setCurrentTime(0);
      setDuration(0);
      songControl('next');
    }
  }, [currentTime, duration, songControl]);

  // Create now playing object
  const nowPlaying = {
    song: moods[mood].playlists[playlist].songs[song],
    playlist: moods[mood].playlists[playlist]
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
      <MusicPlayer
        key={nowPlaying.song.src}
        src={nowPlaying.song.src}
        audioRef={musicRef}
        volume={100}
      />
    </main>
  );
};

// Application export
export default App;
