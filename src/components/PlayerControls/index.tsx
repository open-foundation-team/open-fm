// React imports
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

// Component imports
import { AmbiencePlayer } from '../AmbiencePlayer';

// Icon imports
import { IconBackward, IconChevronDown, IconCloud, IconCoffee, IconFire, IconForward, IconLoop, IconPause, IconPlay, IconSettings, IconShare } from '../../icons';

// Style imports
import './styles.scss';

// Type imports
import { IPlaylist, ISong } from '../../types';
import { Scrubber } from '..';


// Component interface
interface PlayerControlsProps {
    isPlaying: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;
    isLooping: boolean,
    setLooping: Dispatch<SetStateAction<boolean>>;
    isShuffled: boolean,
    setShuffled: Dispatch<SetStateAction<boolean>>;
    nowPlaying: {
        song: ISong,
        playlist: IPlaylist
    };
    songControl: (action: 'next' | 'prev') => void;
    duration: number;
    currentTime: number;
}


// Component declaration
export const PlayerControls = ({
    isPlaying,
    setPlaying,
    isLooping,
    setLooping,
    isShuffled,
    setShuffled,
    nowPlaying,
    songControl,
    duration,
    currentTime
}: PlayerControlsProps) => {

    // Component states
    const [isAmbienceOpen, setAmbienceOpen] = useState(false);

    // Classes from states
    const playingClass = isPlaying ? 'playing' : null;
    const loopingClass = isLooping ? 'looping' : null;
    const shuffledClass = isShuffled ? 'shuffled' : null;
    const ambienceClass = isAmbienceOpen ? 'open' : null;

    // Ambience audio files
    const ambienceSamples = useMemo(() => [
        {
            icon: <IconCoffee />,
            title: 'coffee house',
            track: '/open-fm/audio/coffee-shop-low.mp3'
        },
        {
            icon: <IconCloud />,
            title: 'thunder storm',
            track: '/open-fm/audio/storm-low.mp3'
        },
        {
            icon: <IconFire />,
            title: 'campfire',
            track: '/open-fm/audio/campfire-low.mp3'
        }
    ], []);

    const [ambiencePlaying, setAmbiencePlaying] = useState<boolean[]>([]);
    const togglePlayingAmbiance = (id: number) => {
        setAmbiencePlaying(ambiencePlaying.map((value, idx) => {
            if (idx === id) return !value;
            return value;
        }));
    };

    const [ambienceVolume, setAmbienceVolume] = useState<number[]>([]);
    const updateAmbienceVolume = (id: number, vol: number) => {
        setAmbienceVolume(ambienceVolume.map((value, idx) => {
            if (idx === id) return vol;
            return value;
        }));
    };

    useEffect(() => {
        setAmbiencePlaying(ambienceSamples.map(() => false));
        setAmbienceVolume(ambienceSamples.map(() => 50));
    }, [ambienceSamples]);

    return (
        <>
            <div className="player-styled">

                {/* Now playing section */}
                <div className="player-nowplaying">
                    <div className="nowplaying-track">
                        <div className="nowplaying-artwork">
                            <img
                                className={[playingClass].join(' ')}
                                src="/open-fm/images/vinyl.jpeg"
                                alt="Spinning vinyl"
                            />
                        </div>
                        <div className="nowplaying-text">
                            <p className="nowtext-song">{nowPlaying.song?.title}</p>
                            <p className="nowtext-playlist">{nowPlaying.playlist.name}</p>
                        </div>
                    </div>
                    <div className="nowplaying-icons" onClick={() => setAmbienceOpen(prev => !prev)}>
                        <IconSettings />
                        <IconShare />
                    </div>
                </div>

                {/* Scrubber section */}
                <div className="player-scrubber">
                    <Scrubber
                        duration={duration}
                        value={currentTime}
                    />
                </div>

                {/* Music controls section */}
                <div className="player-controls">
                    <button className={["loop-shuffle", shuffledClass].join(' ')} onClick={() => setShuffled(prev => !prev)}>
                        <IconLoop />
                    </button>
                    <button className="forward-rewind" onClick={() => songControl('prev')}>
                        <IconBackward />
                    </button>
                    <button className="play-pause" onClick={() => setPlaying(prev => !prev)}>
                        {isPlaying ?
                            <IconPause />
                            :
                            <IconPlay />
                        }
                    </button>
                    <button className="forward-rewind" onClick={() => songControl('next')}>
                        <IconForward />
                    </button>
                    <button className={["loop-shuffle", loopingClass].join(' ')} onClick={() => setLooping(prev => !prev)}>
                        <IconLoop />
                    </button>
                </div>
            </div>

            {/* Ambience floating section */}
            <div className={["player-ambience", ambienceClass].join(' ')}>
                <div className="ambience-header">
                    <p className="header-title">Ambience</p>
                    <span onClick={() => setAmbienceOpen(false)}>
                        <IconChevronDown />
                    </span>
                </div>
                <div className="button-group">
                    {ambienceSamples.map((env, idx) => {

                        const activeTrack = ambiencePlaying[idx] ? 'active' : null;

                        return (
                            <div
                                className={["ambience-button", activeTrack].join(' ')}
                                key={idx}
                            >
                                <div
                                    className='button-clickarea'
                                    onClick={() => togglePlayingAmbiance(idx)}
                                >
                                    {env.icon}
                                    <p>{env.title}</p>
                                </div>
                                <AmbiencePlayer
                                    src={env.track}
                                    volume={ambienceVolume[idx]}
                                    isPlaying={ambiencePlaying[idx]}
                                />
                                <input type="range" min={0} max={100} step={1} defaultValue={50} onChange={(e) => updateAmbienceVolume(idx, parseInt(e.target.value))} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
};