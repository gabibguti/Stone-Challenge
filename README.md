# StoneChallenge

Simple web application integrated with API Rest.

Web application interface developed with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.
Database generated with [MongoDB](https://www.mongodb.com/cloud/atlas).
API Rest developed in **Python** and **Flask**.

The deployments were made using **Heroku** for the API and **GitHub Pages** for the Angular interface.

The application can be accessed at:
https://gabibguti.github.io/Stone-Challenge/

The API can be accessed at:
https://funcionariosapi.herokuapp.com/challenge/funcionarios

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Building and deploying application to **GitHub Pages**:
ng build --prod --base-href https://gabibguti.github.io/Stone-Challenge/
npx ngh --dir "dist/StoneChallenge"

## Most relevant files

[API in Python + Flask](https://github.com/gabibguti/Stone-Challenge/blob/master/Database/app.py)
[App Service and HTTP requests](https://github.com/gabibguti/Stone-Challenge/blob/master/src/app/app.service.ts)
[Main App Interface](https://github.com/gabibguti/Stone-Challenge/blob/master/src/app/app.component.html)
[Main App code](https://github.com/gabibguti/Stone-Challenge/blob/master/src/app/app.component.ts)

## Contact

This project was developed by Gabriela Gutierrez.
