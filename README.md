<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#deploy">Deploy</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a project of template build with nodejs and oracle database.
Of course it maybe not good. And no problem, i know that i am really not good, so if you have any complains about this project, please contact me or make an issue, i will receive and improve it soon.

And next, I am so sorry about this announcement. This project at the time you read it, it is not working. I spent 2 day to install Oracle database, Oracle client and try to connect to Oracle database with Sql developer tool, but it is so fucking difficult. I install database with zip file, with RPM, with docker,... and finally, so lucky docker work, but then i still can't connect to it. So i am really sorry about that.
I decide to code the feature, middleware, model first, and try to connect to database on next day (tomorrow).
Again, i am so sorry.

If you have any tips to install database and connect, i hope you can spend time to help me to connect to Oracle database, please. I am so tired with it.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [Nodejs](https://nodejs.org/en/)
- [Node oracle](https://oracle.github.io/node-oracledb/)
- [Expressjs](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Install npm
  ```sh
  npm install npm@latest -g
  ```
- Oracle Database
  Install Oracle Database, Oracle Client.

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:duongvonga2/node-oracle-template.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   or if you use `yarn`
   ```sh
   yarn
   ```
3. Start project
   ```sh
   npm start
   ```
   or if you use `yarn`
   ```sh
   yarn
   ```

<!-- USAGE EXAMPLES -->

## Deploy

I use `pm2` to deploy project on cloud server from local.

1.  Config
    To use it, first you must make sure that you can connect to cloud server by `ssh` without password and clone git repository to cloud server without git authenticate. You can do it with `ssh public key`, copy `ssh public key` on your local computer and past it into file `.ssh/authorized_keys` on cloud server to `ssh` to server without password. And copy `ssh public key` of server and past into github account to clone repository without git authenticate.

2.  Setup environment
    Install pm2:

    ```
      npm install pm2@latest -g
    ```

    or

    ```
    yarn global add pm2
    ```

    Make sure your project has ecosystem.config.js file before run.

    ```sh
    pm2 deploy `your environment name` setup
    ```

    After run, if the terminal show the message: `deploy success` and on server, the path that you defined to deploy contain 3 folder `current, shared, source`, congratulation, you do it successfully.

3. Deploy
   Then, you can deploy your project by the command:

    ```sh
      pm2 deploy `your environment name`
    ```

    _For more examples, please refer to the [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/deployment/)_

<!-- CONTACT -->

## Contact

Duong Vong - [duongvonga2@gmail.com]()
