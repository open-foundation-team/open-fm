// Global imports
import { useEffect } from 'react';

// Style imports
import './styles.scss';

// Component props
interface MusicPlayerProps {
    src: string;
    volume: number;
    isPlaying?: boolean;
    audioRef: React.RefObject<HTMLAudioElement>;
}


// Component declaration and export
export const MusicPlayer = ({ src, volume = 50, isPlaying = false, audioRef }: MusicPlayerProps) => {

    // Update the audio play state
    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying) audio?.play();
        if (!isPlaying) audio?.pause();
    }, [isPlaying]);

    // Update the audio volume
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume / 100;
    }, [volume]);

    return (
        <div className="musicplayer-styled">
            <audio src={src} ref={audioRef} loop />
        </div>
    );
};