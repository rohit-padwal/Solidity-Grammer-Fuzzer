# Getting Started with SolGram

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Frontend Installation Guide

● Download and install [Node.js](https://nodejs.org/en/download/)

● Install [Visual Studio Code](https://code.visualstudio.com/download)

● Clone the repository from our [Github link](https://github.com/rohit-padwal/solGram)

● Import the project folder into Visual Studio Code

● To install [Angular](https://angular.io/guide/setup-local) cli, run command “npm i @angular/cli” in cmd line

● Run “npm install” followed by “npm start” in cmd line

● A web application would run locally on your default web browser

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Backend Installation Guide
  1. Set up a python environment(>=3.8) on your local machine.
  2. Clone github repository and navigate to server directory.
  3. Install dependencies from requirements.txt since this is a python flask app
    - Run command : pip install flask
    - Run command : pip install solidity_parser
    - Run command: npm install -g solhint
  4. Use PyCharm/VS code for code compilation, compile the app.py file inside the server directory and then run flask application.
  5. Run command: flask run
  6. Once code is running locally, now we need to test the APIs written in python on Postman.
  7. Download and install postman.
  8. Import API collection from ‘UTA - SolGram.postman_collection.json’ uploaded in github.
  9. Navigate to collections on the left side bar of Postman. Go to Collections > UTA- Solgram. You will see 3 APIs , and execute it for viewing output.
