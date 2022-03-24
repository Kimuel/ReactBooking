# ReactBooking
React Booking List Sample


Packages:
  - React v17
  - MUI v5
  - Redux v4
  - Redux Saga v1
  - Moment
  - React Hook Form
  - Yup
  - React Table
  - React Intl
  - React Router

File Structure
  - root
    - app
      - components - This folder is for all reusable components
      - containers - This is where the components with reducers/sagas located.
      - css - stylesheets
      - enums - constant enumaration values
      - helpers - helper functions
      - utils - utilities for the application (e.g. constants, paths, theme)
      - app.js - entry point
      - json - mock data
      - configureStore.js
      - i18n.js
      - index.html
      - reducers.js
    - internals
    - package.json
    - package-lock.json
    - babel.config.json
    - jest.config.json
    - .prettierrc
    - .eslintrc.js

Mock Data
  - app/json/schedules.json
  - app/json/rooms.json

How to run:
  - npm install
  - npm start
  - npm test
  - npm run lint:eslint:fix

Note:
 - This code uses react-boilerplate template starter kit and I update all of its packages.
 - There`s no unit test yet for the components (Pending)
