const foodModel = require('../src/models/food.model')

async function createFood(req, res) {
console.log(req.foodPartner)
console.log(req.body)
res.send("food item created")

}

module.exports = {
    createFood,
}