$and;
db.users.findOne({ $and: [{ filter_one }, { filter_two }] });
//example
db.users.findOne({$and:[{ name:"Rahul Sharma"},{age:25 }]},{name:1,age:1})

$or
db.users.find({$or:[{ filter_one},{ filter_two}]})

db.users.find({$or:[{name:"Rahul Shrama"},{age:25}]})


//if we write 
db.users.find({age:{$gte:25}},{age:{$lte:25}})  //mongoDb will take lastOne ONLy