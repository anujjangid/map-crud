# Add, Delete or edit map point from here

## How to Run this

- `npm install`
- `npm run start`

Package will be open on http://localhost:3000/

For the DB connection you should be connected on `mongodb://localhost:27017/crud-mongo`, Please update DB connection in `app.js`

DB Path:- `mongod --dbpath=/data`

### Fields Required

- Latitude
- Longitude
- Title
- Description

### End points

- Fetch all the list of markers
  http://localhost:3000/list
- Adding the marker using long press
  http://localhost:3000/adds
- Update the description of the marker
  http://localhost:3000/update
- Delete the marker from the DB
  http://localhost:3000/delete/id


### Screen Shot

![Crud Operation](https://i.ibb.co/5nRHrnT/Screenshot-2019-04-10-at-2-48-39-PM.png)
