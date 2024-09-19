//Who are registred more recently
[
  {
    $sort: {
      registered: -1,
    },
  },
  {
    $limit: 5,
  },
];

// $push after grouping wgat fields u want into the array
$push[
  {
    $group: {
      _id: "$favoriteFruit",
      usersArray: {
        $push: {
          name: "$name",
          age: "$age",
          gender: "$gender",
        },
      },
    },
  }
];

//How many users have 'ad' as the second tag in their list of tags....
//just missed this means we have to
//when access to OBJ
// have to erite as ""
[
  {
    $match: {
      "tags.1": "ad",
    },
  },
][
  //find the useers who have both enim and is as teir tag
  {
    $match: {
      $and: [{ tags: "ad" }, { tags: "enim" }],
    },
  }
];

//using with all
// $all: Specific to arrays and ensures that all specified elements are present within an array
// Use $all for matching all elements in an array.
// Use $and for combining multiple conditions explicitly.
[
  {
    $match: {
      tags: { $all: ["enim", "id"] },
    },
  },
  { $count: "count" },
];

//list all the companies located in the usa and their corrsponding userCOunt
[
  {
    $match: {
      "company.location.country": "USA",
    },
  },
  { $count: "NoOFUsersWorkingUSA" },
];
