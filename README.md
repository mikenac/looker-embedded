# looker-embedded
Looker embedded React application and auth endpoint.

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
|REACT_APP_LOOKER_AUTH_URL| The URL of the authentication service. Should be '/auth' |
|REACT_APP_LOOKER_HOST| Your Looker server DNS name (used by client side. |

These can be put into .env files in the project root and client/ folders (REACT ones go in client/) for development.
