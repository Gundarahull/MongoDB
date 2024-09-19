//finding the no fo avg tags
// ------------------------------------*************$unwind*********--------------------------------------
// {
//     "_id": {
//       "$oid": "66cb5b646023e5d61dc6464c"
//     },
//     "index": 0,
//     "name": "Aurelia Gonzales",
//     "isActive": false,
//     "registered": {
//       "$date": "2015-02-11T04:22:39.000Z"
//     },
//     "age": 20,
//     "gender": "female",
//     "eyeColor": "green",
//     "favoriteFruit": "banana",
//     "company": {
//       "title": "YURTURE",
//       "email": "aureliagonzales@yurture.com",
//       "phone": "+1 (940) 501-3963",
//       "location": {
//         "country": "USA",
//         "address": "694 Hewes Street"
//       }
//     },
//     "tags": [
//       "enim",
//       "id",
//       "velit",
//       "ad",
//       "consequat"
//     ]
//   }
[
  {
    $unwind: {
      path: "$tags",
    },
  },
  {
    $group: {
      _id: "$_id",
      noOfTags: {
        $count: {},
      },
    },
  },
  {
    $group: {
      _id: null,
      averageNoOfTags: {
        $avg: "$noOfTags",
      },
    },
  },
];

// ----------------------------------------------------------------------------------------------------
$addFields--;
//it will add fiels into the doc..
//$size --it will shows the length of ARRAY
[
  {
    $addFields: {
      noOfTags: {
        $size: "$tags",
      },
    },
  },
  {
    $group: {
      _id: null,
      averageNoOfTags: {
        $avg: "$noOfTags",
      },
    },
  },
];
