//we dont need this much
[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "JOINED-FIELDS",
    },
  },
  {
    $addFields: {
      objField: {
        $arrayElemAt: ["$JOINED-FIELDS", 0],
      },
    },
  },
];

//look up is enough i think
//nomrally we get in the Array only right...
//leftOuterJOIN
[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "JOINED-FIELDS",
    },
  },
];

//Inerhoin
[
  {
    "$lookup": {
      "from": "authors",
      "localField": "author_id",
      "foreignField": "_id",
      "as": "JOINED_FIELDS"
    }
  },
  {
    "$match": {
      "JOINED_FIELDS": { "$ne": [] }
    }
  }
]

