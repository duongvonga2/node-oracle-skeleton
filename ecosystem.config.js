// your git repository
const gitRepository = "git@github.com:duongvonga2/node-oracle-template.git";
const hostUser = "hostUser"; // username to login to cloud server, example: root
const hostIp = "xxx.xxx.xxx.xxx"; // ip of host or server
const path = "/root/server"; // path of folder on server, which you want to deploy in
const ref = "origin/master"; // remote name / branch name, which you want to clone or pull on server
module.exports = {
  apps: [
    {
      name: "your app name",
      script: "dist/index.js", // main file to run after build
    },
  ],

  deploy: {
    production: {
      user: hostUser,
      host: hostIp,
      ref,
      repo: gitRepository,
      path,
      "post-deploy": "yarn && yarn run build && pm2 reload ecosystem.config.js",
    },
  },
};
