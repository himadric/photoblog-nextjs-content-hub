import getConfig from 'next/config'
import OAuthPasswordGrant from "@sitecore/sc-contenthub-webclient-sdk/dist/authentication/oauth-password-grant";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";

const { serverRuntimeConfig } = getConfig()

export default async function GetContentHubClient() {
    //fetch data from external source
    // Your Sitecore Content Hub endpoint to connect to
    const endpoint = serverRuntimeConfig.contentHubEndPoint;

    // Enter your credentials here
    const oauth = new OAuthPasswordGrant(
            serverRuntimeConfig.contentHubAuth.clientId,
            serverRuntimeConfig.contentHubAuth.clientSecret,
            serverRuntimeConfig.contentHubAuth.username,
            serverRuntimeConfig.contentHubAuth.password
    );

    // Create the JavaScript SDK client
    const client = new ContentHubClient(endpoint, oauth);
    return client;
}