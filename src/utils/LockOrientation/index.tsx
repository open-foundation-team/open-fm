/* eslint-disable @typescript-eslint/no-explicit-any */
// Global imports
import { useEffect } from 'react';

// Component props
interface LockOrientationProps {
    selectedorientation?: 'portrait' | 'landscape';
}


// Component declaration and export
export const LockOrientation = ({ selectedorientation = 'portrait' }: LockOrientationProps) => {
    useEffect(() => {
        const lockOrientation = () => {
            if ((screen.orientation as any)?.lock) {
                (screen.orientation as any).lock('portrait');
            } else if ((screen as any)?.lockOrientation) {
                (screen as any).lockOrientation('portrait');
            }
        };

        lockOrientation();

        return () => {
            if (screen.orientation?.unlock) {
                screen.orientation.unlock();
            } else if ((screen as any)?.unlockOrientation) {
                (screen as any).unlockOrientation();
            }
        };
    }, [selectedorientation]);

    return null;
};
