$exists;

db.users.find({ age: { $exists: true } }); //yevaru aithe age exists ayi untaroo vallani mathrame chudu....

$sum;

db.users.aggregate([
  {
    $group: {
      _id: null, // Group by null to aggregate all documents
      totalAge: { $sum: "$age" }, // Summing the age field
    },
  },
]);

//when we want Count
db.users.aggregate([
  {
    $group: {
      _id: null, // Group by null to aggregate all documents
      totalAge: { $sum: 1 },
    },
  },
]);

$max;
db.users.aggregate([
  {
    $group: {
      _id: null, // Group by null to aggregate all documents together
      maxAge: { $max: "$age" }, // Use $max to find the maximum age
    },
  },
]);

$min;
db.users.aggregate([
  {
    $group: {
      _id: null, // Group by null to aggregate all documents together
      maxAge: { $max: "$age" }, // Use $max to find the maximum age
    },
  },
]);

//in Another way
db.users.aggregate([
  {
    $sort: {
      age: -1,
    },
  },
  {
    $limit: 1,
  },
]);

db.sightings.aggregate([
    {
        $match:{
            "$species_common":"Eastern Bluebirds"
        }
    },
    {
        $group:{
            _id:"$location.coordinates",
            most:{
                $push:{
                    location:"$_id"
                }
            }
        }
    },
    {
        $sort:{
            location:-1
        }
    },
    {
        $limit:1
    }
])
