//Hpw many users have 'enim as one oin their tag...

[
  {
    $match: {
      gender: "male",
    },
  },
][
  //in another way
  ({
    $unwind: {
      path: "$tags",
    },
  },
  {
    $match: {
      tags: "id",
    },
  },
  {
    $group: {
      _id: null,
      fieldN: {
        $count: {},
      },
    },
  })
];

//what are the names and age of users who are inactive and have 'velit' as a tag
[
  {
    $match: {
      $and: [{ tags: "velit" }, { isActive: false }],
    },
  },
  {
    $project: {
      name: 1,
      age: 1,
    },
  },
];
//ANother way
[
  {
    $match: {
      gender: "male",
    },
  },
  {
    $group: {
      _id: "$eyeColor",
      users: {
        $push: {
          name: "$name",
          age: "$age",
        },
      },
    },
  },
  {
    $project: {
      eyeColor: "$_id",
      users: 1,
      _id: 0,
    },
  },
];

//the members who are start eith 
[
    {
      $match: {
        "company.phone": {
          $regex: "^\\+1 \\(940\\)"
        }
      }
    },
    {
      $count: "countOfNumber"
    }
  ]