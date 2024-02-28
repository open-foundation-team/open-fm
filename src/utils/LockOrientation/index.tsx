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
            if ('lock' in screen.orientation) {
                (screen.orientation as any).lock('portrait').then(
                    (success: any) => console.debug(success),
                    (failure: any) => console.debug(failure)
                );
            } else if ((screen as any)?.lockOrientation) {
                (screen as any).lockOrientation('portrait');
            }
        };

        lockOrientation();

        return () => {
            if ('unlock' in screen.orientation) {
                try {
                    screen.orientation.unlock();
                } catch (err) {
                    console.debug('Screen rotation unlock err: ', err)
                }
            } else if ((screen as any)?.unlockOrientation) {
                (screen as any).unlockOrientation();
            }
        };
    }, [selectedorientation]);

    return null;
};
