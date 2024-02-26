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

    return (
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
    );
};