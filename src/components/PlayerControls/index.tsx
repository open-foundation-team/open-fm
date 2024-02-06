// React imports
import { useEffect, useMemo, useState } from 'react';

// Component imports
import { AmbiencePlayer } from '../AmbiencePlayer';

// Icon imports
import { IconBackward, IconChevronDown, IconCloud, IconCoffee, IconFire, IconForward, IconLoop, IconPause, IconPlay, IconSettings, IconShare } from '../../icons';

// Style imports
import './styles.scss';


// Component declaration
export const PlayerControls = () => {

    const [isPlaying, setPlaying] = useState(false);
    const [isAmbienceOpen, setAmbienceOpen] = useState(false);
    const ambienceClass = isAmbienceOpen ? 'open' : null;

    const ambienceSamples = useMemo(() => [
        {
            icon: <IconCoffee />,
            title: 'coffee house',
            track: '/audio/coffee-shop-low.mp3'
        },
        {
            icon: <IconCloud />,
            title: 'thunder storm',
            track: '/audio/storm-low.mp3'
        },
        {
            icon: <IconFire />,
            title: 'campfire',
            track: '/audio/campfire-low.mp3'
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
        console.log(vol);
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
                    <div className="nowplaying-text">
                        <p className="nowtext-song">Studio Ghibli - Spirited Away</p>
                        <p className="nowtext-playlist">coders delight()</p>
                    </div>
                    <div className="nowplaying-icons" onClick={() => setAmbienceOpen(prev => !prev)}>
                        <IconSettings />
                        <IconShare />
                    </div>
                </div>

                {/* Music controls section */}
                <div className="player-controls">
                    <button className="loop-shuffle">
                        <IconLoop />
                    </button>
                    <button className="forward-rewind">
                        <IconBackward />
                    </button>
                    <button className="play-pause" onClick={() => setPlaying(!isPlaying)}>
                        {isPlaying ?
                            <IconPlay />
                            :
                            <IconPause />
                        }
                    </button>
                    <button className="forward-rewind">
                        <IconForward />
                    </button>
                    <button className="loop-shuffle">
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
                                onClick={() => togglePlayingAmbiance(idx)}
                                key={idx}
                            >
                                {env.icon}
                                <p>{env.title}</p>
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