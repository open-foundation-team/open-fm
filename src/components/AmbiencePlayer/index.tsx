// Global imports
import { useEffect, useRef } from 'react';

// Style imports
import './styles.scss';

// Component props
interface AmbiencePlayerProps {
    src: string;
    isPlaying?: boolean;
}


// Component declaration
export const AmbiencePlayer = ({ src, isPlaying = false }: AmbiencePlayerProps) => {

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying) audio?.play();
        if (!isPlaying) audio?.pause();
    }, [isPlaying]);

    return (
        <div className="ambienceplayer-styled">
            <audio src={src} ref={audioRef} />
        </div>
    );
};