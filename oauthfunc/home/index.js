module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const oauthProvider = process.env.OAUTH_PROVIDER || "github";
  const loginAuthTarget = process.env.AUTH_TARGET || "_self";

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
  return {
    headers: { "Content-Type": "text/html" },
    body: `Hello<br>
    <a href="/auth" target="${loginAuthTarget}">
      Log in with ${oauthProvider.toUpperCase()}
    </a>`,
  };
};
