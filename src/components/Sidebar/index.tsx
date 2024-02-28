// Global imports
import { Dispatch, SetStateAction } from 'react';

// Style imports
import { IMood } from '../../types';
import './styles.scss';


// Component props
interface SidebarProps {
    moods: IMood[];
    selectedMood: number;
    selectedPlaylist: number;
    selectedSong: number;
    updateMood: Dispatch<SetStateAction<number>>;
    updateSong: Dispatch<SetStateAction<number>>;
    nextPlaylist: () => void;
}


// Component declaration and export
export const Sidebar = ({
    moods,
    selectedMood,
    selectedPlaylist,
    selectedSong,
    updateMood,
    updateSong,
    nextPlaylist
}: SidebarProps) => {

    const focusModes = moods.map((mood) => mood.name);
    const currentPlaylist = moods[selectedMood].playlists[selectedPlaylist];

    const nextHiddenClass = moods[selectedMood].playlists.length > 1 ? null : 'hidden';

    return (
        <div className="sidebar-styled">

            {/* Header section */}
            <div className="sidebar-header">
                <img className='header-logo' src="/open-fm/logo.png" alt="open.fm ambient radio logo" />
                <p className='header-title'>open.fm</p>
            </div>

            {/* Mood Focus section */}
            <div className="sidebar-focus">
                {focusModes.map((mode, idx) => {

                    const activeClass = idx === selectedMood ? 'active' : null;

                    return (
                        <button
                            className={["focus-button", activeClass].join(' ')}
                            onClick={() => updateMood(idx)}
                            key={idx}
                        >
                            {mode}
                        </button>
                    )
                })}
            </div>

            {/* Playlist section */}
            <div className="sidebar-playlist">
                <p className="playlist-title">{currentPlaylist.name}</p>
                <button className={["playlist-next", nextHiddenClass].join(' ')} onClick={() => nextPlaylist()}>
                    [Next]
                </button>
            </div>

            {/* Generic spacer */}
            <div className="sidebar-spacer" />

            {/* Tracks section */}
            <div className="sidebar-tracks">
                <ul className="track-list">
                    {currentPlaylist.songs.map((track, idx) => {

                        const activeTrack = idx === selectedSong ? 'active' : null;

                        return (
                            <li
                                className={["track", activeTrack].join(' ')}
                                onClick={() => updateSong(idx)}
                                key={idx}
                            >
                                {track.title} - {track.artist}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};