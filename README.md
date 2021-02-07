# Demonstration of Netlify CMS deployment to Azure

 Full implementation of a Serverless CMS on Azure, using Netlify CMS, Gatsby and Azure Functions. Built and Deployed using GitHub Actions

 The solution consists of a Gatsby app stored in the root of the repository, with most relevant code stored in src.
 This Gatsby app processes the markdown files stored in src/content into pages. More information on how Gatsby works can be found [here](https://www.gatsbyjs.com/).

 The Netlify CMS configuration is stored in static/admin/config.yml. You need to configure the settings at the top of the file to point towards your repo and your function app address - the rest can be left as is unless you want to add more types of data to manage. To find out more about configuring Netlify CMS check out their [site](https://www.netlifycms.org/docs/github-backend/).
 
 This makes the app respond on the /admin/ path with a CMS screen as so:
 ![Splash page asking user to login using GitHub](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-admin-login.PNG)

 For this to work, you need to setup the Azure Function in the /oauthfunc folder. What this does is handle letting the CMS verify your account with GitHub by exposing a set of endpoints that implement the OAuth standard. This is why in the static/admin/config.yml file you need to list the address of the function app - it's telling Netlify CMS where to look for its OAuth implementation. For this function to be allowed to implement OAuth and verify GitHub accounts, it needs permission from the repository owner in the form of an OAuth Client Id and Secret. You set this up by visiting this [page](https://github.com/settings/applications/new). Note that you need to enter a callback address which is also on your Function App.
 ![GitHub setup OAuth App](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-github-oauth-app.PNG)
 
 You then need to modify the static/admin/config.yml to replace the base_url with your function app address - otherwise your Netlify CMS will attempt to use my Azure Function for authorization and fail. You also want to replace the 'repo' value with your own, so that it knows to point at your repository not mine.
 ![Netlify CMS config file showing base_url and repo set to my values](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-netlify-config.PNG)

 These two values are then stored in the GitHub Repository Secrets section so that they can be accessed by GitHub Actions for deployment, like the screenshot:
 ![GitHub Secrets section](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-github-secrets.PNG)

 Next, you need to fill in the other secrets. One of them is a simple Azure subscription ID, and the other is the credential to allow GitHub actions to deploy resources to azure, which is retrieved by executing the command: az ad sp create-for-rbac --sdk-auth

 Copy and paste the JSON that is output into the terminal into the AZURE_CREDENTIALS secret, the instructions are [here](https://github.com/marketplace/actions/azure-login).

 You're almost ready to go. Next you need to configure the GitHub Action environment variables to make sure it deploys your own resource group (you'll collide with the demo otherwise and have your ARM template rejected). Choose whatever names you like, the CDN's will be named after the storage account automatically.
 ![GitHub Actions environment variable setup](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-github-actions-env.PNG)

 You'll notice there is a custom url in there for the domain, which is currently a subdomain of my danielbass.dev domain. You'll need to decide if you want a custom url or not. If you aren't bothered about the custom domain you can use the CDN profile endpoint, which takes the form cdn-endpoint-{storageAccountName}.azureedge.net

 If you, on the other hand, wish to use the custom domain, it is a little involved but not too bad. Setup a CNAME record on your DNS and point it towards your CDN profile endpoint like and wait for a bit (supposedly 48 hours, but I've found 15 minutes is more like it with Google Domains). Enter your custom domain into the DOMAIN variable and run the GitHub action. Visit the CDN profile in the Azure portal. Click add a custom domain:
 ![Azure Portal custom domain setup](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-azure-custom-domain.PNG)

 You absolutely should then set up a SSL/TLS certificate so your users can use HTTPS. If you want to do this the easy way, Azure CDN can manage the certificate for you - autorenewing it etc. It's also possible to use your own certificate, but honestly I would only do that if I absolutely had to (usually for compliance reasons/enterprise IT restrictions). Click the Custom Domain and configure the certificate as follows:
 ![TLS certificate set up set to minimum level of 1.2](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-azure-tls-certificate.PNG)

 Once the process has completed, you should be able to visit your custom domain, and see the website as follows. Note the lock, showing that the website is served with a valid HTTPS connection.
 ![home page of the website](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-home-page.PNG)

 You can now visit the /admin/ address, click login with GitHub and it will prompt you to authorize Netlify CMS to login to GitHub on your behalf. That's because Netlify CMS will change the content of the website by doing commits on your behalf and changing the markdown files (and JSON files for the menu bar). Once you are past that you will reach the home page of Netlify CMS:
 ![Netlify CMS list of index, about and contact us pages](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-list-pages.PNG)

 You can then edit pages using the easy to use rich text editor. When you click publish, Netlify CMS will make a commit to main, and trigger a build and release.
 ![Rich text editor of About page](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-richtexteditor.PNG)

 You can edit the navigation bar by visiting the NavBar section. You can add links to different pages, and nest the menu's so that they appear in dropdowns. This edits the json file at src/menu/menuItems.json
 ![Manage NavBar in Netlify CMS](https://github.com/deepbass/serverless-cms-azure/raw/main/readme-images/serverless-cms-edit-navbar.PNG)

 There's also various other features, like uploading images that will get put in the src/content/images folder. Look up the full features of Netlify CMS on its [website](https://www.netlifycms.org/)

 You're all ready to go. Please do visit the example site [here](https://serverlesscms.danielbass.dev) and feel free to drop any issues on this repo or email me@danielbass.dev