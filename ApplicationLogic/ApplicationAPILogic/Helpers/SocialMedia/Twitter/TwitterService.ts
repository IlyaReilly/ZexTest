//Import package
import { Client, auth } from 'twitter-api-sdk';
import { socialMediaData } from '../SocialMediaData';

// Initialize auth client first
const authClient = new auth.OAuth2Bearer(socialMediaData.twitter.bearer_token);

// Pass auth credentials to the library client 
const twitterClient = new Client(authClient);

export const getUserByUsername = async (username) => {
  try {
    return twitterClient.users.findUserByUsername(
      //The Twitter username (handle) of the user.
      username,
      {
        // Optional parameters
        "user.fields": ["public_metrics"],
      }
    );  
  } catch (error) {
    console.log(error);
  }
};