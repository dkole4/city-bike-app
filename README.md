# City Bike App

This is a bike journey displaying app implemented as a programming exercise.

## Configuring the app

To configure the app:
- Set environment variables `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB` in `docker-compose.yaml` to appropriate ones.
- Set environment variables `DB_USERNAME`, `DB_PASSWORD` and `DB_NAME` in `/backend/.env` to chosen values.
- Comment out or remove `ports` field of `db` container from `docker-compose.yaml` file if you don't need the database container to be externally accessible.

**Example data:**  
- Dataset of journey data, owned by City Bike Finland: https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
- Dataset of station data, Helsinki Region Transport’s (HSL) city bicycle stations: https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

## Starting the app

- To start the backend part of the application, use command `docker-compose up --build` in the root directory.
If you want to import data to the database, place `stations.csv` and `journeys.csv` files to the `/database/data` directory before starting the application.

- To start the frontend in development mode, install dependencies by running `npm install` in `/frontend` folder and start it by running `npm start` in the same folder.

## Running tests

- To run backend tests, use command `docker-compose up --build backend-tests`.

## Used technologies and why they were chosen
- TypeScript
  - Widely used in web-development currently.
  - Makes writing code without bugs easier.
- PostgreSQL
  - I have used PostgreSQL in my past projects.
- TypeORM
  - Makes it easier to interact with database and switch it to another one if needed.
  - Supports many popular databases (for example MongoDB, MySQL, PostgreSQL, SQLite).
  - I wanted to try to use ORM instead of regular SQL queries.
- React
  - Widely used in web-development currently.
  - I have used React in my past projects.
- Express.js
- Node.js

