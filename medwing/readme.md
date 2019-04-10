### Add/Delete or Edit description of the point

#### Tech Stack

- React-Native
- Flow

## How to Start the Project

- Installed all the dependencies using `npm install`
- Open the xCode and navigate to ios folder `./ios`, and build the Project.
- Before Add/Delete or Edit on map, your localhost should be up for the mongodb.
- Now it's time to add the point using longPress anywhere on the map.

#### Note: For more reference see the screenshots

### End points

- Fetch all the list of markers
  http://localhost:3000/list
- Adding the marker using long press
  http://localhost:3000/adds
- Update the description of the marker
  http://localhost:3000/update
- Delete the marker from the DB
  http://localhost:3000/delete/id
