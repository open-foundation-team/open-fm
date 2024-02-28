/* eslint-disable react-hooks/exhaustive-deps */

// Component imports
import { useEffect, useRef, useState } from "react";
import { MusicPlayer, PlayerControls, Sidebar } from "./components";

// Type imports
import { IMood } from "./types";

// Audio library imports
import library from "./data/musicLibrary.json";

// Assert the type of the imported JSON
const typedLibrary: IMood[] = library as IMood[];


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
    if (action === 'next' && song !== typedLibrary[mood].playlists[playlist].songs.length - 1) setSong(prev => prev + 1);
    if (action === 'next' && song === typedLibrary[mood].playlists[playlist].songs.length - 1) setSong(0);
    if (action === 'prev' && song !== 0) setSong(prev => prev - 1);
    if (action === 'prev' && song === 0) musicRef.current!.currentTime = 0;
  };

  // Add listenter to play state of audio ref
  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    audio.addEventListener('ended', () => songControl('next'));

    // Play the song whenever the song index changes
    const playSong = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error('Playback failed', error);
      }
    };

    if (isPlaying) playSong();

    return () => {
      audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
      audio.removeEventListener('ended', () => songControl('next'));
    };
  }, [song, playlist, mood]);

  // Update the audio play state
  useEffect(() => {
    const audio = musicRef.current;
    if (isPlaying) audio?.play();
    if (!isPlaying) audio?.pause();
  }, [isPlaying]);

  // Create now playing object
  const nowPlaying = {
    song: typedLibrary[mood].playlists[playlist].songs[song],
    playlist: typedLibrary[mood].playlists[playlist]
  };


  return (
    <main className="app-container">
      <img
        src="/open-fm/images/slides/plants.jpeg"
        alt="Slide background"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          width: '100dvw',
          height: '100dvh',
          zIndex: -100
        }}
      />
      <Sidebar
        moods={typedLibrary}
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
        duration={duration}
        currentTime={currentTime}
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
