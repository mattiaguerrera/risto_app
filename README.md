# RistoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Firebase Deploy

> npm build
> npm install -g firebase-tools
> firebase login --reauth
> firebase deploy

## Info Testing App

Deleting angular material css for angular.json to styles node:
> "@angular/material/prebuilt-themes/pink-bluegrey.css"

## JSON Server Auth

Install both JSON Server and JSON Server Auth :
// NPM
> npm install -D json-server json-server-auth

Start JSON server (with JSON server Auth as middleware) :
> json-server .\src\assets\files\data.json -d 1000 -p 7000 -m ./node_modules/json-server-auth

## Hosting
// Firebase o NuxtJs
// Hosting su Vercel e Netlify che son gratuiti