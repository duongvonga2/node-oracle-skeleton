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
        <li><a href="#install-oracle">Install Oracle</a></li>
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

### Install Oracle

If you installed Oracle database completely. Congratulation, you can skip this step.
Otherwise you have not yet, read the lines below safely. It so fucking difficult to me and It take so much time to install and config to complete.

I had installed Oracle database with docker, and next i will show you how i install.

1. Download Oracle database
   go to `https://www.oracle.com/database/technologies/oracle-database-software-downloads.html#19c` to download Oracle database zip file.
   Chose the file that compatible with you OS.
   In my case, i use Oracle database 19.3
2. Clone docker images repository and run docker
   Go to `https://github.com/oracle/docker-images.git` and clone this project to your local. Go to `OracleDatabase/SingleInstance/dockerfiles/`, this is the folder that contain oracle database version images. Access to `19.3.0`, insert this code to `setupLinuxEnv.sh` file:

   ```
    yum - y install nano && \
   ```

   Because the default docker not install `nano or vim` to edit text, so that you should install it in case you need.
   Copy Oracle database ZIP file to here, in the `OracleDatabase/SingleInstance/dockerfiles` run these command:

   ```
   ./buildDockerImage.sh -v 19.3.0 -e
   ```

   It may take 10-15 minutes to complete. And when the line `Build completed in xxx seconds` appear on the screen you know it complete.

   Next run the following to set the docker name, oracle pdb, password, port:

   ```
   docker run \
   --name oracle19c \
   -p 1521:1521 \
   -p 5500:5500 \
   -e ORACLE_PDB=orcl \
   -e ORACLE_PWD=password \
   -e ORACLE_MEM=2000 \
   -v /opt/oracle/oradata \
   -d \
   oracle/database:19.3.0-ee
   ```

   ```
   docker logs -f oracle19c
   ```

   And wait a minutes when it run.

   Access into Oracle database in docker:

   ```
   docker exec -it oracle19c /bin/bash
   ```

3. Install Sql developer tool and connect to Oracle db
   Download and install Sql developer tool and connect to Oracle database.

   ![image](https://fv2-2.failiem.lv/thumb_show.php?i=bu9c8gxy2&view)

   If you connect success. You can skip net step.

4. Config and fix bug can not connect to Oracle database
   If you get the message `ORA-12637 Package receive failed` or `got minus one from a read call sql developer`. Don't worry, on docker run this command:

   ```
     cd $ORACLE_HOME/network/admin
     nano sqlnet.ora
   ```

   ![image](https://lh4.googleusercontent.com/ibFTugGTkGhvW61wdyZdYdCA7_VXgzTOZlScVmw2QvHUJqJByyutVfkalZ5bXjyM9MyrvnD6L1a6R_TOAyeh=w1600-h801)
   And past this command to the file:

   ```
   DISABLE_OOB=ON
   ```
   Then connect again.
   It have too many bugs, but above it all what i remember :v.

### Installation

1. Clone the repository
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
   Copy all content in `env.example` file and past into `.env`, replace the exact value of your project. Then, run this command:

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

3.  Deploy
    Then, you can deploy your project by the command:

    ```sh
      pm2 deploy `your environment name`
    ```

    _For more examples, please refer to the [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/deployment/)_

<!-- CONTACT -->

## Contact

Duong Vong - [duongvonga2@gmail.com]()
