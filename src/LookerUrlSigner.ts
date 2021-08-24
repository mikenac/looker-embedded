import { createSignedUrl }from "./auth_utils";
import { LookerEmbedUser } from "./auth_utils";
import { ParsedQs } from "qs";

export class LookerUrlSigner {
    // Wrapper class for signing looker URLs
    host: string;
    secret: string;
    user: LookerEmbedUser;

    constructor(lookerHost: string, lookerSecret: string, embedUser: string) {
        this.host = lookerHost;
        this.secret = lookerSecret;
        this.user = JSON.parse(embedUser);

    }

    signUrl (url: string | ParsedQs | string[] | ParsedQs[]) {

        return createSignedUrl(url.toString(), this.user, this.host, this.secret);
    }
}