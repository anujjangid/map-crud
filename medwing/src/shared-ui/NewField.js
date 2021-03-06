// @flow
import { ObjectID } from 'bson';

type Point = {
  title: string,
  description: string,
  latitude: number,
  longitude: number
};
export default function NewField(points: Point) {
  // get the same dynamic id as generated by mongo DB
  const id = new ObjectID();
  const newPoint = {
    title: 'Newly marked Entry',
    _id: id,
    description: `Available from ${new Date().toLocaleString()}.`,
    coordinate: {
      latitude: points.latitude,
      longitude: points.longitude
    }
  };

  return newPoint;
}
