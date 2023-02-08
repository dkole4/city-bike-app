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

- To start the backend part of the application:
  - Place `stations.csv` and `journeys.csv` files to the `/database/data` folder. Leave them empty to if you don't want to import any data on the startup.
  - Run command `docker-compose up --build`.

- To start the frontend in development mode:
  - Install dependencies by running `npm install` in `/frontend` folder,
  - Run command `npm start` in the same folder.

## Running tests

- To run backend tests:
  - Place `stations.csv` and `journeys.csv` files to the `/database/data` folder,
  - Run command `docker-compose up --build backend-tests`. 

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

