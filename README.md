# ReactJS_BuildPackageAndNotify
This project will build reactjs project and notify build result to Slack
Define these properties in .env
PROJECT_NAME=<Name of this project which will be shown on message to Slack>
SLACK_CHANNEL=<Channel Name of Slack>
SLACK_HOOK_URL=<URL of hook from Slack>

# setup
install package
`npm install --save @chaunnt/reactjs_buildpackageandnotify` or `yarn add @chaunnt/reactjs_buildpackageandnotify`

add this command to your `package.json`
```
"scripts": {
    "autobuild": "npx @chaunnt/reactjs_buildpackageandnotify"
  },
```
# sample 
run command `yarn autobuild`

