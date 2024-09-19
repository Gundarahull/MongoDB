// and

learning_db> db.people.find({ $and: [{ age: { $gte: 27 } }, { age: { $lte: 50 } }] })

//or
db.people.find({ $or: [{ age: { $gte: 27 } }, { age: { $lte: 50 } }] })

//nor
learning_db> db.people.find({ $nor: [{ age: { $gte: 27 } }] })
