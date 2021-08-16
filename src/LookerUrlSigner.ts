import { createSignedUrl }from "./auth_utils";
import { LookerEmbedUser } from "./auth_utils";
import { ParsedQs } from "qs";

export class LookerUrlSigner {
    host: string;
    secret: string;
    user: LookerEmbedUser;

    constructor(lookerHost: string, lookerSecret: string) {
        this.host = lookerHost;
        this.secret = lookerSecret;

        // bullshit test user
        this.user = {
            "external_user_id": "5",
            "session_length": 600,
            "permissions": [],
            "force_logout_login": true,
            "models": [],
            "group_ids": [2],
            "access_filters": {}
        }
    }

    signUrl (url: string | ParsedQs | string[] | ParsedQs[]) {

        return createSignedUrl(url.toString(), this.user, this.host, this.secret);
    }
}