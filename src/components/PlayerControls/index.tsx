// React imports
import { useState } from 'react';

// Icon imports
import { IconBackward, IconForward, IconLoop, IconPause, IconPlay } from '../../icons';

// Style imports
import './styles.scss';


export const PlayerControls = () => {

    const [isPlaying, setPlaying] = useState(false);

    return (
        <div className="player-styled">
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
    );
};