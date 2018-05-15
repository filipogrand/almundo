# Almundo Quickstart Project for Frontend Angular 1.x

## Installation
After to download the project, please run the command `npm install && bower install`
Also in any case that 2 commands do not run fine, please run: npm install first and then bower install

## Run and Build
* For run the project, please run the command `gulp serve`, by default, this instance use the local environment variables.
* For build the project, please run the command `gulp build:local`, `gulp build:staging` or `gulp build` depending the final destination (local, stating or production server)

## Environment variables management
All the environment variables are defined in the json file **env.json** stored in the root of the repository. You can edit and add new variables inside the each environment object. If you want to change between environment while is running the local project, you need to run the command `gulp config:local`, `gulp config:staging` or `gulp config:production`. **_Note:_** is not necessary stop the local server for apply this change.