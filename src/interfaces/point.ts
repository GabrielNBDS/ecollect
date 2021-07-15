interface IPoint {
  id: string;
  name: string;
  image: string;
  imagePath: string;
  address: string;
  ownerId: string;
  center: firebase.default.firestore.GeoPoint;
  markerPos: firebase.default.firestore.GeoPoint;
}

export default IPoint;
