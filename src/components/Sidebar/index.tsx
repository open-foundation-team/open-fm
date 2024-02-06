// Style imports
import './styles.scss';

export const Sidebar = () => {

    const focusModes = ['code', 'sleep', 'chill', 'work'];

    const sampleTracks = [
        "Studio Ghibli - Kiki's Delivery Service",
        "Studio Ghibli - Spirited Away",
        "Studio Ghibli - Howl's Moving Castle",
        "Studio Ghibli - Kiki's Delivery Service",
        "Studio Ghibli - Spirited Away",
        "Studio Ghibli - Howl's Moving Castle",
        "Studio Ghibli - Kiki's Delivery Service",
        "Studio Ghibli - Spirited Away",
        "Studio Ghibli - Howl's Moving Castle",
        "Studio Ghibli - Kiki's Delivery Service",
        "Studio Ghibli - Spirited Away",
        "Studio Ghibli - Howl's Moving Castle",
        "Studio Ghibli - Kiki's Delivery Service",
        "Studio Ghibli - Spirited Away",
        "Studio Ghibli - Howl's Moving Castle",
        "Studio Ghibli - Kiki's Delivery Service",
        "Studio Ghibli - Spirited Away",
        "Studio Ghibli - Howl's Moving Castle",
        "Studio Ghibli - Kiki's Delivery Service",
        "Studio Ghibli - Spirited Away",
        "Studio Ghibli - Howl's Moving Castle",
        "Studio Ghibli - Kiki's Delivery Service",
        "Studio Ghibli - Spirited Away",
        "Studio Ghibli - Howl's Moving Castle",
    ];

    return (
        <div className="sidebar-styled">
            <div className="sidebar-header">
                <img className='header-logo' src="/logo.png" alt="open.fm ambient radio logo" />
                <p className='header-title'>open.fm</p>
            </div>
            <div className="sidebar-focus">
                {focusModes.map((mode, idx) => {

                    const activeClass = idx === 0 ? 'active' : null;

                    return (
                        <button className={["focus-button", activeClass].join(' ')} key={idx}>
                            {mode}
                        </button>
                    )
                })}
            </div>
            <div className="sidebar-playlist">
                <p className="playlist-title">coders delight()</p>
                <button className="playlist-next">[Next]</button>
            </div>
            <div className="sidebar-spacer" />
            <div className="sidebar-tracks">
                <ul className="track-list">
                    {sampleTracks.map((track, idx) => {

                        const activeTrack = idx === 1 ? 'active' : null;

                        return (
                            <li className={["track", activeTrack].join(' ')} key={idx}>
                                {track}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};