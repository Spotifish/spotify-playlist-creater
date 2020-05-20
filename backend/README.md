# spotify-playlist-creater
Creates Spotify Playlist by building via configurable clusters

# API
## Authorization
Authorization is done through cookie or jwt not sure yet tbh.

## Get User Playlist Info
**Method:** GET

**URI:** `/api/v1/playlists/<userId>`

**Return example:**

    {
        userName: 'Peter Altmeier',
        userId: 1234456789,
        playlists: [
            {
                name: 'Saved Tracks',
                totalTracks: 1300,
                id: '0',
                owner: 'Peter Altmeier',
                images: [{
                    url: 'https://u.scdn.co/images/pl/default/438f9b65ac4eb48681351593142daeb070986293',
                    width: 530,
                    height: 320,
                }]
            },
            {
                name: 'Sitzungsturnup',
                totalTracks: 145,
                id: '25h4rf',
                owner: 'Peter Altmeier',
                images: [{
                    url: 'https://u.scdn.co/images/pl/default/438f9b65ac4eb48681351593142daeb070986293',
                    width: 530,
                    height: 320,
                }]
            }
        ]
    }

**Example Request**
GET `/api/v1/playlists/<userId>?jwt=9h873nqwo5niekrvthd7`
## Get Filtered Songs

**Method:** GET

**URI:** `/api/v1/filteredSongs`

#### Query Parameters:
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


**Example Request**
GET `/api/v1/playlists/<userId>?jwt=9h873nqwo5niekrvthd7`

## Create new Playlist

**Method:** POST

**URI:** `/api/v1/createPlaylist`

#### Body Parameters:

