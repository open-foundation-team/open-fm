export interface ISong {
    title: string;
    artist: string;
    album?: string;
    src: string;
}

export interface IPlaylist {
    name: string;
    songs: ISong[];
}

export interface IMood {
    name: string;
    playlists: IPlaylist[];
}