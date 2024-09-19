//Equal
learning_db> db.people.find({age:40})

//Not Equal
learning_db> db.people.find({age:{$ne:40}})

//Greter than Equal too
learning_db> db.people.find({age:{$gte:40}})

//Greater than
learning_db> db.people.find({age:{$gt:40}})

//Less than Equal too
learning_db> db.people.find({age:{$lte:40}})

//less than
learning_db> db.people.find({age:{$lt:40}})

//in will take Array--andhulo unnavi mokana dengu
learning_db> db.people.find({age:{$in:[27,50]}})

//not in --avi kakunda
learning_db> db.people.find({age:{$nin:[27,50]}})


