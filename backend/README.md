# spotify-playlist-creater
Creates Spotify Playlist by building via configurable clusters

# API Spoxyfoxy

**URL:** /proxy

**Method:** POST

**Body:**

    {
        url: <URL for Spotify API without https://api.spotify.com >,
        method: <GET/POST/PUT>
        body: <JSON for Request Body>
    }

Returns Answer as sent from Spotify API<br>429 is handled by Server
