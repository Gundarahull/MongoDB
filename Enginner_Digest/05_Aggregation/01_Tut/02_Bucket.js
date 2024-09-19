$bucket;
//we use bucket to categorize or seperate separate group
//like i want the students whose age bettwen 1-30 30-40 and greater than 40
//in these case we want to categorize it using bucket
//$bucket expression

// {
//     $bucket:{
//         groupBy:"$age", //these field i want to group
//         boundaries:[1,20,30,40], //boundaries limit
//         default:"other ages", //if the value is not in the boundaries it will be in other group
//         output:{
//             names:{$push:"$name"}
//         }
//     }
// }

db.students.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [1, 20, 30, 40],
      default: "other ages",
      output: {
        names: { $push: "$name" },
      },
    },
  },
]);
