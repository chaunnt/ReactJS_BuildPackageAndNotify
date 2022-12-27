#!/usr/bin/env node

const { execSync, exec } = require('child_process');
require('dotenv').config();

function reportToSlack(message, attachments) {
  if (!process.env.SLACK_HOOK_URL) {
    return;
  }
  var Slack = require('node-slack');
  var slack = new Slack(process.env.SLACK_HOOK_URL);
  slack.send({
    text: `${message}`,
    channel: process.env.SLACK_CHANNEL,
    username: 'Bot',
    icon_emoji: 'taco',
    attachments: attachments,
    unfurl_links: true,
    link_names: 1
  });
}

function buildReactJS() {
  try {
    console.log(`execute job ${__dirname}`);
    const buildProcess = exec(`cd ${__dirname} && cd ../../../../ && yarn run build`, {
      maxBuffer: 1024 * 1024 * 1024
    });
    reportToSlack(`build ${process.env.PROJECT_NAME} start ${new Date}`)
    buildProcess.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });

    buildProcess.stderr.on('message', data => {
      console.error(`stderr: ${data}`);
    });

    buildProcess.on('close', code => {
      console.log(`child process closed with code ${code}`);
      if (code !== 0) {
        reportToSlack(`build error ${process.env.PROJECT_NAME} start ${new Date}`, [
          {
            "type": "plain_text",
            "text": ":broken_heart:"
          }
        ])
      } else {
        reportToSlack(`build finish ${process.env.PROJECT_NAME} start ${new Date}, [
          {
            "type": "plain_text",
            "text": ":white_check_mark:"
          }
        ]`)
      }
    });
    buildProcess.on('message', code => {
      console.log(`child process message with code ${code}`);
    });
    buildProcess.on('disconnect', code => {
      console.log(`child process disconnect with code ${code}`);
    });
    buildProcess.on('exit', code => {
      console.log(`child process exited with code ${code}`);
    });
  } catch (error) {
    console.error(error)
  }
}

function main() {
  console.log("Say Hello from ChauNNT");
  buildReactJS()

}

if (require.main === module) {
  main();
}