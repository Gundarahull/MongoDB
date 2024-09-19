$lookup;

//look up is nothing but the left outer Join(Common fields + fields which are in the left)
//Basic Expression
// {
//     $lookup:{
//         from: "collection_name",  //the table which we ant to join
//         localField: "field_name",  //the field nama which is presn=ent user_reg_id
//         foreignField: "field_name",  //the user_reg_id in this table like reg_id
//         as: "field_name"             // how i want to show
//     }
// }

//Customers Collection
db.customers.insertMany([
  { name: "Rahul" },
  { name: "Priya" },
  { name: "Amit" },
  { name: "Sneha" },
]);

//Order Collection
const rahul = db.customers.findOne({ name: "Rahul" })._id;
const priya = db.customers.findOne({ name: "Priya" })._id;
const amit = db.customers.findOne({ name: "Amit" })._id;
const sneha = db.customers.findOne({ name: "Sneha" })._id;

db.orders.insertMany([
  { product_name: "Laptop", price: 75000, customer_id: rahul },
  { product_name: "Mobile", price: 20000, customer_id: priya },
  { product_name: "Tablet", price: 30000, customer_id: amit },
  { product_name: "Headphones", price: 5000, customer_id: sneha },
  { product_name: "Smartwatch", price: 15000, customer_id: rahul },
]);

//orders
learning_db> db.orders.find({})
[
  {
    _id: ObjectId('66cac8f2b8299600ff228fc3'),
    product_name: 'Laptop',
    price: 75000,
    customer_id: ObjectId('66cac8d7b8299600ff228fbf')
  },
  {
    _id: ObjectId('66cac8f2b8299600ff228fc4'),
    product_name: 'Mobile',
    price: 20000,
    customer_id: ObjectId('66cac8d7b8299600ff228fc0')
  },
  {
    _id: ObjectId('66cac8f2b8299600ff228fc5'),
    product_name: 'Tablet',
    price: 30000,
    customer_id: ObjectId('66cac8d7b8299600ff228fc1')
  },
  {
    _id: ObjectId('66cac8f2b8299600ff228fc6'),
    product_name: 'Headphones',
    price: 5000,
    customer_id: ObjectId('66cac8d7b8299600ff228fc2')
  },
  {
    _id: ObjectId('66cac8f2b8299600ff228fc7'),
    product_name: 'Smartwatch',
    price: 15000,
    customer_id: ObjectId('66cac8d7b8299600ff228fbf')
  }
]

//Customers
learning_db> db.customers.find({})
[
  { _id: ObjectId('66cac8d7b8299600ff228fbf'), name: 'Rahul' },
  { _id: ObjectId('66cac8d7b8299600ff228fc0'), name: 'Priya' },
  { _id: ObjectId('66cac8d7b8299600ff228fc1'), name: 'Amit' },
  { _id: ObjectId('66cac8d7b8299600ff228fc2'), name: 'Sneha' },
  { _id: ObjectId('66caca48b8299600ff228fc8'), name: 'cool' }
]

//lookup
db.customers.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "customer_id",
      as: "Left outer join",
    },
  },
]);
//normal lookup
[
    {
      _id: ObjectId('66cac8f2b8299600ff228fc3'),
      product_name: 'Laptop',
      price: 75000,
      customer_id: ObjectId('66cac8d7b8299600ff228fbf'),
      customer_details_with_all: [ { _id: ObjectId('66cac8d7b8299600ff228fbf'), name: 'Rahul' } ]
    },
    {
      _id: ObjectId('66cac8f2b8299600ff228fc4'),
      product_name: 'Mobile',
      price: 20000,
      customer_id: ObjectId('66cac8d7b8299600ff228fc0'),
      customer_details_with_all: [ { _id: ObjectId('66cac8d7b8299600ff228fc0'), name: 'Priya' } ]
    },
    {
      _id: ObjectId('66cac8f2b8299600ff228fc5'),
      product_name: 'Tablet',
      price: 30000,
      customer_id: ObjectId('66cac8d7b8299600ff228fc1'),
      customer_details_with_all: [ { _id: ObjectId('66cac8d7b8299600ff228fc1'), name: 'Amit' } ]
    },
    {
      _id: ObjectId('66cac8f2b8299600ff228fc6'),
      product_name: 'Headphones',
      price: 5000,
      customer_id: ObjectId('66cac8d7b8299600ff228fc2'),
      customer_details_with_all: [ { _id: ObjectId('66cac8d7b8299600ff228fc2'), name: 'Sneha' } ]
    },
    {
      _id: ObjectId('66cac8f2b8299600ff228fc7'),
      product_name: 'Smartwatch',
      price: 15000,
      customer_id: ObjectId('66cac8d7b8299600ff228fbf'),
      customer_details_with_all: [ { _id: ObjectId('66cac8d7b8299600ff228fbf'), name: 'Rahul' } ]
    }
  ]

  
//Inner Join
db.orders.aggregate([
    {
      // Step 1: Perform the lookup (join)
      $lookup: {
        from: "customers",                    // The collection to join with (customers)
        localField: "customer_id",            // The field in orders to match with
        foreignField: "_id",                  // The field in customers to match against
        as: "customer_details_with_all"       // The name of the new field to hold the joined data
      }
    },
    {
      // Step 2: Unwind the joined data
      $unwind: "$customer_details_with_all"
    },
    {
      // Step 3: Match only documents with matching customers
      $match: {
        "customer_details_with_all": { $exists: true }
      }
    },
    {
      // Step 4: Project only the fields you want in the output
      $project: {
        product_name: 1,                              // Include the product_name from orders
        price: 1,                                     // Include the price from orders
        "customer_details_with_all.name": 1,          // Include the name from customers
        _id: 0,                                       // Exclude the _id from orders
        "customer_details_with_all._id": 1            // Include the _id from customers
      }
    }
]).pretty();

//Resukt
[
  {
    product_name: "Laptop",
    price: 75000,
    customer_details_with_all: {
      _id: ObjectId("66cac8d7b8299600ff228fbf"),
      name: "Rahul",
    },
  },
  {
    product_name: "Mobile",
    price: 20000,
    customer_details_with_all: {
      _id: ObjectId("66cac8d7b8299600ff228fc0"),
      name: "Priya",
    },
  },
  {
    product_name: "Tablet",
    price: 30000,
    customer_details_with_all: {
      _id: ObjectId("66cac8d7b8299600ff228fc1"),
      name: "Amit",
    },
  },
  {
    product_name: "Headphones",
    price: 5000,
    customer_details_with_all: {
      _id: ObjectId("66cac8d7b8299600ff228fc2"),
      name: "Sneha",
    },
  },
  {
    product_name: "Smartwatch",
    price: 15000,
    customer_details_with_all: {
      _id: ObjectId("66cac8d7b8299600ff228fbf"),
      name: "Rahul",
    },
  },
];
