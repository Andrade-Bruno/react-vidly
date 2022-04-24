export const cities = [
    {_id: 1231, name: 'Los Angeles'},
    {_id: 1234, name: 'San Francisco'},
    {_id: 1237, name: 'Miami'},
    {_id: 1239, name: 'New York'},
    {_id: 1240, name: 'Clermont'},
  ];
  
  export function getCities() {
    return cities.filter(city => city);
  }
  