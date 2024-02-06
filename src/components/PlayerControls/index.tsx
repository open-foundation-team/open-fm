// React imports
import { useState } from 'react';

// Icon imports
import { IconBackward, IconChevronDown, IconCloud, IconCoffee, IconFire, IconForward, IconLoop, IconPause, IconPlay, IconSettings, IconShare } from '../../icons';

// Style imports
import './styles.scss';


export const PlayerControls = () => {

    const [isPlaying, setPlaying] = useState(true);
    const [isAmbienceOpen, setAmbienceOpen] = useState(false);
    const ambienceClass = isAmbienceOpen ? 'open' : null;

    const ambienceSamples = [
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
            track: '/audio/storm-low.mp3'
        },
    ];

    return (
        <>
            <div className="player-styled">
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
                <div className="player-controls">
                    <button className="loop-shuffle">
                        <IconLoop />
                    </button>
                    <button className="forward-rewind">
                        <IconBackward />
                    </button>
                    <button className="play-pause" onClick={() => setPlaying(!isPlaying)}>
                        {isPlaying ?
                            <IconPause />
                            :
                            <IconPlay />
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
            <div className={["player-ambience", ambienceClass].join(' ')}>
                <div className="ambience-header">
                    <p className="header-title">Ambience</p>
                    <span onClick={() => setAmbienceOpen(false)}>
                        <IconChevronDown />
                    </span>
                </div>
                <div className="button-group">
                    {ambienceSamples.map((env, idx) => {

                        const activeTrack = idx === 0 ? 'active' : null;

                        return (
                            <div className={["ambience-button", activeTrack].join(' ')} key={idx}>
                                {env.icon}
                                <p>{env.title}</p>
                            </div>
                        )
                    })

                    }
                </div>
            </div>
        </>
    );
};