db.students.aggregate([
  { $unwind: "$subjects" },
  {
    $group: {
      _id: null,
      details: { $push: "$name" },
      count: { $sum: 1 },
    },
  },
]);

//find the avergae age of students
db.students.aggregate([{ $group: { _id: null, avgAge: { $avg: "$age" } } }]);

//find the number of bobbies for all the students..
db.students.aggregate([
  {
    $group: {
      _id: null,
      hobbies: { $sum: { $size: "$subjects" } },
    },
  },
]);

db.students.aggregate([
  {
    $group: {
      _id: null,
      hobbies: {
        $sum: {
          $size: {
            $ifNull: ["$subjects", []], // Ensure `subjects` is treated as an array
          },
        },
      },
      details: { $push: "$name" }, // Collect all the names into an array
    },
  },
]);

db.students.aggregate([
    { $match: { age: { $gte: 20 } } },
    { 
      $group: { 
        _id: null, 
        avgOfMore20: { $avg: "$age" }  // Corrected key for average calculation
      } 
    }
  ]);
  