/* eslint-disable react-hooks/exhaustive-deps */
// Global imports
import { useEffect } from 'react';

// Style imports
import './styles.scss';

// Component props
interface MusicPlayerProps {
    src: string;
    volume: number;
    audioRef: React.RefObject<HTMLAudioElement>;
}


// Component declaration and export
export const MusicPlayer = ({ src, volume = 100, audioRef }: MusicPlayerProps) => {

    // Update the audio volume
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume / 100;
    }, [volume]);

    return (
        <div className="musicplayer-styled">
            <audio src={src} ref={audioRef} />
        </div>
    );
};