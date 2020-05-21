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



## Get Filtered Songs

**Method:** GET

**URI:** `/api/v1/filteredSongs`

#### Query Parameters:

Tracks will be sorted by _some parameter_ (maybe date added or smth), with offset and length it's possible to get chunks of tracks to not overforder the client

**Offset**

Offset of returned tracks

**Amount**

Amount of returned Tracks

**Playlist Sources:**

playlists=\<playlistId1\>,\<playlistId2\>

_Remark: Users Saved Tracks have ID 0_

**Filter Parameters:**
Use f_\<filterAttribute\>=\<lowerBound\>,\<upperBound\><br>

Possible filterAttributes:
- acusticness
- dancability
- duration_ms
- energy
- instrumentalness
- key
- liveness
- loudness
- mode
- speechiness
- temp
- time_signature
- valence

For further reference see [Spotify API Documentation](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/)

**Example Request:**

GET `/api/v1/filteredSongs?f_acusticness=3,10&f_dancability=4,5&playlists=0,7c6jzlubbx,xcrpqskrc4&jwt=9h873nqwo5niekrvthd7`

**Return example:**

    {
        'totalTracks': 2,
        'tracks': [
            'title': 'Vegan Duck for Breakfast',
            'artist': 'yunggoth✰',
            'id': '35365gws',
            'features': {
                'danceability': 0.808,
                'energy': 0.626,
                'key': 7,
                'loudness': -12.733,
                'mode': 1,
                'speechiness': 0.168,
                'acousticness': 0.00187,
                'instrumentalness': 0.159,
                'liveness': 0.376,
                'valence': 0.369,
                'tempo': 123.99,
                "duration_ms": 535223,
                "time_signature": 4
            }
        ],[
            'title': 'Flasche Luft',
            'artist': 'BHZ',
            'id': 'f43l4as',
            'features': {
                'danceability': 0.808,
                'energy': 0.626,
                'key': 7,
                'loudness': -12.733,
                'mode': 1,
                'speechiness': 0.168,
                'acousticness': 0.00187,
                'instrumentalness': 0.159,
                'liveness': 0.376,
                'valence': 0.369,
                'tempo': 123.99,
                "duration_ms": 535223,
                "time_signature": 4
            }
        ]
    }
