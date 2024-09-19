$eq 
//operator yedhi aithe equal qyithundo adhi
db.users.findOne({age:{$eq:22}})
db.users.find({age:23})
//i think we can use both cases

$neq
//operator yedhi aithe not equal qyithundo adhi
db.users.find({age:{$ne:22}})

$lte
db.users.find({age:{$lte:25}})

$lt
db.users.find({age:{$lt:25}})

$gte
db.users.find({age:{$gte:25}})

$gt
db.users.find({age:{$gt:25}})

//when we filterd greater than 25 like that there will be lot of members right
//for that
db.users.updateMany({age:{$gt:25}},{$set:{age:25}})

$in
//indhulo unna vallani na mokana dengu
db.users.find({age:{$in:[25,26,27]}})

$nin
db.users.find({age:{$nin:[25,36,78]}})