import { LookerUrlSigner } from './LookerUrlSigner';
import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import path from 'path'

const app = express();
app.use(cors());

// Create a static pathmap for serving react pages
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const port = process.env.PORT || 5000;


// This displays message that the server running and listening to specified port
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/auth', cors(), (req, res) => {
  // TODO: Authenticate request

  const signer = new LookerUrlSigner(process.env.LOOKER_SERVER, process.env.LOOKER_SECRET);

  const url = signer.signUrl(req.query.src);
  res.json({url})
});

app.get("*", cors(), (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


