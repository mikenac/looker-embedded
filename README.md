# looker-embedded
Looker embedded React application and auth endpoint.

![example workflow](https://github.com/mikenac/looker-embedded/actions/workflows/node.js.yml/badge.svg)

## Usage:

### Build

`npm install && npm run build`


### Develop
`npm run build:live`

Starts both the auth endpoint (PORT) and the react app (3000). They are both (mostly) watched for changes to make development easier.

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
|CLIENT_ID| IdP oAuth Client ID |
|BASE_URL| The base url for callback with the auth tickets, i.e. https://localhost |
|VALID_USERS| Valid users to control access. E.G. {"users": ["bobdobalina"]} |
|ISSUER_BASE_URL| The issuer url for obtaining auth tickets, i.e. https://somehost.auth0.com/ |
|SESSION_SECRET| Random string for local use only (*NOT* IdP secret) |
|EMBED_USER| The Looker embed user for this POC. E.G. {"external_user_id": "5","session_length": 600,"permissions": [],"force_logout_login": true,"models": [],"group_ids": [200],"access_filters": {}} |
|REACT_APP_LOOKER_AUTH_URL| The URL of the authentication service. Should be '/auth' |
|REACT_APP_LOOKER_HOST| Your Looker server DNS name (used by client side) |
|REACT_APP_HOME_TEXT| Text on landing page.  Default: Home is where the heart is |

These can be put into .env files in the project root and client/ folders (REACT ones go in client/) for development.
