const key = 'AIzaSyAwRmbZz6iFdVq1aomfeZrf0lEwSwoITXU';
const get = require('lodash/get');

const distance = require('google-distance-matrix');
 
distance.key(key);
distance.units('metric');

const formatCoordinates = (lat, long) => {
  const joined = [lat, long].join();
  return [joined];
};
 
const getGoogleMapsDistance = (origins, destinations) => {
  return new Promise((resolve, reject) => {
    distance.matrix(origins, destinations, (err, distances) => {
      if (err) {
        throw err;
      }
      if(!distances) {
        console.log('no distances');
      }
      if (distances.status == 'OK') {
        const result = get(distances, 'rows[0].elements[0]', null);
        const distanceInMeters = get(result, 'distance.value', null);
        resolve(distanceInMeters);
      }
    });
  })
  .catch((err) => console.log(`rejected: ${err}`));
};

module.exports = {
  formatCoordinates,
  getGoogleMapsDistance,
};