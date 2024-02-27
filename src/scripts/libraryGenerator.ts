// Global imports
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Type imports
import { IMood, IPlaylist, ISong } from '../types';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Function to capitalise every work in string
function capitalizeWords(str: string): string {
    return str.replace(/\b(\w)/g, function (match, capture) {
        match.split('');
        return capture.toUpperCase();
    });
}

// Find directories with a directory
function getDirectories(srcPath: string): string[] {
    return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

// Function to get all audio files in a given directory
function getSongs(srcPath: string, publicDir: string): ISong[] {
    return fs.readdirSync(srcPath).map(file => {
        const filePath = path.join(srcPath, file);
        const relativePath = path.relative(publicDir, filePath);
        const [filename,] = file.split('.');
        const [title, artist] = filename.split('_');
        return {
            title: capitalizeWords(title.replace(/-/g, ' ')),
            artist: artist && capitalizeWords(artist.replace(/-/g, ' ')),
            album: 'Unknown',
            src: '/open-fm/' + relativePath
        };
    });
}

// Construct mood structure from directories
function buildMoodDirectory(srcPath: string, publicDir: string): IMood {
    const moodName = path.basename(srcPath);
    const playlists: IPlaylist[] = getDirectories(srcPath).map(playlistDir => {
        return {
            name: playlistDir,
            songs: getSongs(path.join(srcPath, playlistDir), publicDir)
        };
    });
    return {
        name: moodName,
        playlists
    };
}

// Construct moods JSON from data
function buildMoods(srcPath: string, publicPath: string): IMood[] {
    return getDirectories(srcPath).map(moodDir => buildMoodDirectory(path.join(srcPath, moodDir), publicPath));
}


// Audio library generator function
function main() {
    const moodsDir = path.join(__dirname, '../../public/audio/playlists');
    const publicDir = path.join(__dirname, '../../public');
    const jsonLocation = path.join(__dirname, '../data/musicLibrary.json');
    const moods: IMood[] = buildMoods(moodsDir, publicDir);
    const jsonOutput = JSON.stringify(moods, null, 2);
    fs.writeFileSync(jsonLocation, jsonOutput);
    console.log('Music Library JSON file generated successfully!');
}

// Run generator function
main();
