# looker-embedded
Looker embedded React application and auth endpoint.

![example workflow](https://github.com/mikenac/looker-embedded/actions/workflows/node.js.yml/badge.svg)

## Usage:

### Build

`npm install && npm run build`


### Develop
`npm run build:live`

Starts both the auth endpoint (PORT) and the react app (3000). They are both (mostly) watched for changed to make development easier.

### Run for realz
`npm start`

Starts everything on (PORT) for real use.

## Configure:

### Environment Variables

| Variable  | Description |
|-----------|-------------|
|LOOKER_SECRET| The Looker embed secret from your Looker instance |
|LOOKER_SERVER| Your Looker server DNS name |
|PORT| The port to run the /auth endpoint (5000) |
|GITHUB_CLIENT_ID|GitHub oAuth Client ID|
|GITHUB_CLIENT_SECRET|GitHub oAuth Client secret|
|GITHUB_AUTH_CALLBACK| The url that GitHub calls back with the auth tickets, i.e. /auth/github/callback|
|VALID_USERS| Valid GitHub users to control access. E.G. {"users": ["bobdobalina"]}|
|EMBED_USER| The Looker embed user for this POC. E.G. {"external_user_id": "5","session_length": 600,"permissions": [],"force_logout_login": true,"models": [],"group_ids": [200],"access_filters": {}}|
|REACT_APP_LOOKER_AUTH_URL| The URL of the authentication service. Should be '/auth' |
|REACT_APP_LOOKER_HOST| Your Looker server DNS name (used by client side. |


These can be put into .env files in the project root and client/ folders (REACT ones go in client/) for development.
