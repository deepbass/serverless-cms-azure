const simpleOauthModule = require("simple-oauth2");
const randomstring = require("randomstring");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const oauthProvider = process.env.OAUTH_PROVIDER || "github";

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

  const code = req.query.code;
  var options = {
    code: code,
  };

  if (oauthProvider === "gitlab") {
    options.client_id = process.env.OAUTH_CLIENT_ID;
    options.client_secret = process.env.OAUTH_CLIENT_SECRET;
    options.grant_type = "authorization_code";
    options.redirect_uri = process.env.REDIRECT_URL;
  }
  let mess, content;
  try {
    const result = await oauth2.authorizationCode.getToken(options);
    const accessToken = oauth2.accessToken.create(result);
    mess = "success";
    content = {
      token: accessToken.token.access_token,
      provider: oauthProvider,
    };
  } catch (error) {
    console.error("Access Token Error", error.message);
    mess = "error";
    content = JSON.stringify(error);
  }

  const script = `
    <script>
    (function() {
      function recieveMessage(e) {
        console.log("recieveMessage %o", e)
        if (!e.origin.match(${JSON.stringify(originPattern)})) {
          console.log('Invalid origin: %s', e.origin);
          return;
        }
        // send message to main window with da app
        window.opener.postMessage(
          'authorization:${oauthProvider}:${mess}:${JSON.stringify(content)}',
          e.origin
        )
      }
      window.addEventListener("message", recieveMessage, false)
      // Start handshare with parent
      console.log("Sending message: %o", "${oauthProvider}")
      window.opener.postMessage("authorizing:${oauthProvider}", "*")
    })()
    </script>`;
  context.log(script);
  return { body: script, headers: { "Content-Type": "text/html" } };
};
