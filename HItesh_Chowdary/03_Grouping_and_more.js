//find the total number of males and females

[
  {
    $match: {
      $or: [{ gender: "male" }, { gender: "female" }],
    },
  },
  {
    $group: {
      _id: null,
      totalCount: {
        $sum: 1,
      },
    },
  },
];

//Based on Gender
[
  {
    $group: {
      _id: "$gender",
      countOfGender: {
        $sum: 1,
      },
    },
  },
];

//which Country has the highest number of registredUsers
[
    {
      $group: {
        _id: "$company.location.country",
        CountryCode: {
          $count: {}
        }
      }
    },
    {
      $sort: {
        CountryCode: -1
      }
    },
    { $limit: 1 }
  ]

  //list all unique eye colurs
  [
    {
      $group: {
        _id: "$eyeColor",
        uniqueColor: {
          $sum: 1
        }
      }
    }
  ] 