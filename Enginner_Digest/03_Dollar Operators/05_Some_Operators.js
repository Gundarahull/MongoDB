$inc;
//Incremant
//+2
//-2 in negative side for Decrremnt
db.collection.updateMany({ age }, { $inc: { age: 2 } });

//increase the age od sita to %0, if ger age is less than to 50

db.collection.updateMany(
  { $and: [{ name: "Sunny" }, { age: { $lt: 50 } }] }, 
  { $set: { age: 50 } }
);

// ---------------------------------------------------------------------------------------------------------

$unset;
//dropping the field
db.colection.updateMany({}, { $unset: { age } });

// --------------------------------------------------------------------

$rename
//renaming the field
db.collection.updateMany({},{$rename:{age:"NEW_AGE"}})


// -----------------------------------------------------------------------------
$upsert
//its a like insert only if there is no match with thatcondition then it will create with the filter condition and it will add into it
db.collection.updateOne({name:"Rahul"},{$set:{age:23}},{upsert:true})
