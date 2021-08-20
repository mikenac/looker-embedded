import { LookerUrlSigner } from './LookerUrlSigner';
import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import path from 'path'
import passport from 'passport';
import {Profile} from 'passport'
import passportGithub  from 'passport-github2'
import cookieSession from "cookie-session";
import session from 'express-session';


const GitHubStrategy = passportGithub.Strategy;

interface BetterSession extends session.Session {
  redirectTo: string
};

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_AUTH_CALLBACK, VALID_USERS } = process.env;
const AUTHORIZED_USERS = JSON.parse(VALID_USERS);


const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    credentials: true
  }));
}

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_AUTH_CALLBACK,
},
(accessToken: string, refreshToken: string, profile: any, done: (err?: Error | null, profile?: any, message?: any) => void) => {
   {

    const passProf = profile as Profile;
    if(AUTHORIZED_USERS.users.includes(passProf.username)){
      return done(null, profile);
    } else {
      return done(null, false, { message: "Invalid User" });
    }
  };
}
));

passport.serializeUser((user, done) => {
  done (null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Create a static pathmap for serving react pages
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cookieSession({
  name: "github-auth-session",
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;


// This displays message that the server running and listening to specified port
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));


const isLoggedIn = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.user) {
    next();
  } else {
    const daSesh = req.session as BetterSession
    daSesh.redirectTo = req.originalUrl;
    res.redirect('/auth/github');
  }
}

app.get('/logout', (req, res) => {
  req.session = null;
  req.logOut();
  res.redirect("/");
})

app.all('/auth/error', (req, res) => {
  res.redirect(401, '/');
});

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github',
  { failureRedirect: '/auth/error'}),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect((req.session as BetterSession).redirectTo || "/");
  });

app.get('/auth', isLoggedIn,
             (req: express.Request, res: express.Response) => {

  const signer = new LookerUrlSigner(process.env.LOOKER_SERVER, process.env.LOOKER_SECRET);

  const url = signer.signUrl(req.query.src);
  res.json({url})
});

app.get("*", isLoggedIn, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

