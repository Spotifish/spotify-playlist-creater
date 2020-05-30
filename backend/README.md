# spotify-playlist-creater
Creates Spotify Playlist by building via configurable clusters

# API Spoxyfoxy

## Proxy

**URL:** /proxy

**Method:** POST

**Body:**

    {
        url: <URL for Spotify API has to contain spotify.com as host>,
        method: <GET/POST/PUT>,
        headers: <JSON with key-value pairs>,
        body: <Body whatever format is needed>,
    }

**Returns**

    {
        error: <Error message from server if request could not be fullfilled; else null>,
        response: <Spotifies API response>
    }
