const fs= require('fs');
const path= require('path');

const filepath = path.join(__dirname,'..', "data", "restaurants.json");
function getStoredRestaurants() {
  const fileData = fs.readFileSync(filepath);
  const storedRestaurants = JSON.parse(fileData);
  return storedRestaurants;
}

function storeRestaurants(storeableRestaurants) {
  fs.writeFileSync(filepath, JSON.stringify(storeableRestaurants));
}

module.exports={
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants:storeRestaurants
};