// Style imports
import './styles.scss';


// Component declaration props
interface ScrubberProps {
    value?: number;
    duration?: number;
}


// Declaration and export of component
export const Scrubber = ({ value = 50, duration = 100 }: ScrubberProps) => {

    const calcValue = value * 100 / duration;
    const progressValue = calcValue <= 100 ? calcValue : 100;

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <div className="scrubber-container">
            <div className="scrubber-counter">
                {formatTime(value)}
            </div>
            <div className="scrubber-styled">
                <div
                    className="scrubber-progress"
                    style={{ width: `${progressValue}%` }}
                />
                <div
                    className="scrubber-marker"
                    style={{ left: `${progressValue - .1}%` }}
                />
            </div>
            <div className="scrubber-counter">
                {formatTime(duration)}
            </div>
        </div>
    );
};