const express = require('express');
const router = express.Router();
const House = require("./houseSchema");

router.post('/houses', async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      bedrooms,
      bathrooms,
      roomSize,
      image,
      availabilityDate,
      rentPerMonth,
      phoneNumber,
      description
    } = req.body;

    const newHouse = new House({
      name,
      address,
      city,
      bedrooms,
      bathrooms,
      roomSize,
      image,
      availabilityDate,
      rentPerMonth,
      phoneNumber,
      description
    });

    const Houses = await newHouse.save();
console.log(Houses,"36 house");
    res.status(201).json(Houses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
