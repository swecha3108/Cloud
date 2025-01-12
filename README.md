# webapp
This application has api's to create, get and update users.
## Requirements

For development, you will need Node.js and a node global package, Yarn and Postgresql installed in your environment.
test

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      sudo apt install nodejs
      sudo apt install npm

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

### PostgreSQL

- #### PostgreSQL installation on Windows
        Just go on [official postgresql website](https://www.postgresql.org/) and download the installer.

- #### PostgreSQL installation on Ubuntu

  You can install PostgreSQL easily with apt install, just run the following commands.

      sudo apt-get -y install postgresql
    (If you want a specific version, use 'postgresql-12' or similar instead of 'postgresql')

- #### Other Operating Systems

  You can find more information about the installation on the [official postgresql website](https://www.postgresql.org/).

You can try to connect to the PostgreSQL database server from any client application e.g., psql and pgAdmin.

## Quick Start

Install dependencies:

    npm install

Start the server:

    npm start

Run the tests:

    npm test
