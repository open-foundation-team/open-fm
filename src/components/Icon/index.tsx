// Optimised icons import
import { icons } from "../../icons/optimized-icons";

// Define type for availible icons
type ValidIcons = keyof typeof icons;

// Define component props
export interface IconProps {
    name: ValidIcons;
    fontSize?: number;
    color?: string;
}


// Declare and export component
export const Icon = ({
    name,
    fontSize = 1,
    color = 'black'
}: IconProps) => {
    return (
        <span
            style={{
                fontSize: `${fontSize}rem`,
                color: color
            }}
            dangerouslySetInnerHTML={{
                __html: icons[name].svg
            }}
        />
    );
};