// Global imports
import { useEffect, useRef } from 'react';

// Style imports
import './styles.scss';

// Component props
interface AmbiencePlayerProps {
    src: string;
    volume: number;
    isPlaying?: boolean;
}


// Component declaration
export const AmbiencePlayer = ({ src, volume = 50, isPlaying = false }: AmbiencePlayerProps) => {

    const audioRef = useRef<HTMLAudioElement>(null);

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
        <div className="ambienceplayer-styled">
            <audio src={src} ref={audioRef} loop />
        </div>
    );
};