import { LookerUrlSigner } from './LookerUrlSigner';
import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import path from 'path'

import rateLimit from 'express-rate-limit'
// import { auth, requiresAuth } from 'express-openid-connect'
import { auth } from 'express-openid-connect'

// set a page rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 per window
});

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const { ISSUER_BASE_URL, BASE_URL, CLIENT_ID, SESSION_SECRET, VALID_USERS, EMBED_USER, LOOKER_SERVER, LOOKER_SECRET, NODE_ENV } = process.env;

// Only these Github users will be able to authenticate.
const AUTHORIZED_USERS = JSON.parse(VALID_USERS);

const app = express();

if (NODE_ENV !== 'production') {
  app.use(cors({
    origin: true,
    credentials: true
  }));
  app.set('trust proxy', true);
}

app.use((req, res, next) => {
  // res.locals.isAuthenticated = req.oidc.isAuthenticated();
  res.locals.activeRoute = req.originalUrl;
  next();
});

app.use(limiter);

// Create a static pathmap for serving react pages
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(
  auth({
    issuerBaseURL: ISSUER_BASE_URL,
    baseURL: BASE_URL,
    clientID: CLIENT_ID,
    secret: SESSION_SECRET,
    authRequired: true,
    auth0Logout: true,
  }),
);
//    authRequired: false,

const port = process.env.PORT || 5000;


// This displays message that the server running and listening to specified port
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

// Function to check if the user is in the list of approved users
const isPermitted = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.oidc.user && AUTHORIZED_USERS.users.includes(req.oidc.user.email.toLowerCase())) {
      next();
  }else {
    res.redirect(401, '/');
  }
}

app.all('/auth/error', (req, res) => {
  res.redirect(401, '/');
});

// Looker auth endpoint that will sign the request from the Looker Embed SDK
// app.get('/auth', requiresAuth(),
app.get('/auth', isPermitted,
             (req: express.Request, res: express.Response) => {

  const signer = new LookerUrlSigner(LOOKER_SERVER, LOOKER_SECRET, EMBED_USER);

  const url = signer.signUrl(req.query.src);
  res.json({url});
});

// Redirect any unhandled routes to react
// app.get("*", requiresAuth(), (req, res) => {
app.get("*", isPermitted, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


