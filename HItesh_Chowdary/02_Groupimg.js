//02 Questiion
//whatis the avg age of all users

[
  {
    $group: {
      _id: null, //these group the whole document into Single group....
      avgAge: { $avg: "$age" }, // Calculating the average age and assigning it to the `avgAge` field
    },
  },
][
  //countof fruits based on therir favorite
  {
    $group: {
      _id: "$favoriteFruit",
      countofFruits: {
        $count: {},
      },
    },
  }
];

//Other way we can use SUM
$sum[
  {
    $group: {
      _id: "$favoriteFruit", // Group by the favoriteFruit field
      countofFruits: {
        $sum: 1, // Count the number of documents for each fruit
      },
    },
  }
];
//   Explanation in Telugu:
//   _id: "$favoriteFruit": favoriteFruit field ni base chesukoni group chesthundi. Ante, e fruit ki entha count unndo calculate chestundi.
//   countofFruits: { $sum: 1 }: Edeina oka fruit oka document lo kanipinchinappudu, adi count ayyi fruit count increment avuthundi.

//Sorting
$sort[
  ({
    $group: {
      _id: "$favoriteFruit",
      countofFruits: {
        $count: {},
      },
    },
  },
  {
    $sort: {
      countofFruits: -1,
    },
  })
];

//limiting
$limit[
  ({
    $group: {
      _id: "$favoriteFruit",
      countofFruits: {
        $count: {},
      },
    },
  },
  {
    $sort: {
      countofFruits: -1,
    },
  },
  { $limit: 2 })
];
