const simpleOauthModule = require("simple-oauth2");
const randomstring = require("randomstring");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const oauth2 = simpleOauthModule.create({
    client: {
      id: process.env.OAUTH_CLIENT_ID,
      secret: process.env.OAUTH_CLIENT_SECRET,
    },
    auth: {
      // Supply GIT_HOSTNAME for enterprise github installs.
      tokenHost: process.env.GIT_HOSTNAME || "https://github.com",
      tokenPath: process.env.OAUTH_TOKEN_PATH || "/login/oauth/access_token",
      authorizePath:
        process.env.OAUTH_AUTHORIZE_PATH || "/login/oauth/authorize",
    },
  });

  const originPattern = process.env.ORIGIN || "";
  if ("".match(originPattern)) {
    console.warn(
      "Insecure ORIGIN pattern used. This can give unauthorized users access to your repository."
    );
    if (process.env.NODE_ENV === "production") {
      console.error(
        "Will not run without a safe ORIGIN pattern in production."
      );
      process.exit();
    }
  }

  // Authorization uri definition
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: process.env.REDIRECT_URL,
    scope: process.env.SCOPES || "repo,user",
    state: randomstring.generate(32),
  });

  // Initial page redirecting to Github
  return {
    status: 301,
    headers: {
      Location: authorizationUri,
    },
    body: {
      authorizationUri
    }
  };
};
