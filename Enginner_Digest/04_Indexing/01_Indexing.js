//INDEXING
//Normally while searvhing in thing in the mongoDb it will go one by one document ..it takes some time
//for these conditions we created INDEXING......

//it store the data in the seperate binary TRee in a sort form to get in fastly....
// ----------------------------------------------------------------------------------------------------------------------
//SINGLE InDEXING...
db.collection.createIndex({ age: 1 }); //1 measn in asc -1 means in desc
db.collection.getIndexs();
db.collectio.dropIndex({ age: 1 }); //drop Indesx

//In ORM Style:
UserSchema.createIndex({ age: 1 });

//More indexs More have to create a binary tree it Will up the storage
//Explain
db.collection.find({ name: "Rahul" }, { name: 1, _id: 0 }).explain();
//it will givw hoe the scanning the docs going on......








// ------------------------------------------------------------------------------------------------------
// //COMPOUNDING INDEX
userSchema.index({ age: 1, name: 1, "company.companyName": 1 });

db.collection.createIndex({ age: 1, name: 1, "company.companyName": 1 });
// Querying on age only: The index can be used for an index scan.
// Querying on age and name: The index can be used for an index scan.
// Querying on age, name, and company.companyName: The index can be used for an index scan.

//if we perform on the name it will go on the colletion Scan only......
db.collection.find({ NEW_AGE: 25 }).explain("executionStats");








//-----------------------------------------------------------------------------------------------------------
//***************TEXT INDEX ***********
//we can create only one Single Text iNDEX
//but here are compunding two into one
learning_db >
  db.collection.createIndex({ name: "text", "company.companyName": "text" });

db.collection.find({ $text: { $search: "youtube" } });
//it will use for the word serach things









// ------------------------------------------------------------------------------------------------------------------------------------------
// |    //MAIN THING
// |   //Manam ippudu CreateIndex vesam anuko..idhi complete aye antha varaku aac ollection lo unna queries lock ayipotayi....
// |    //yendhuku ra mava manaku idhi,
// |    //kumtha musukoni nomral ga querying chesthey saripothadhi ga........
// |
db.collection.createIndex({ age: 1 }, { background: true }); //age kakunda remaining Query will run man....
// --------------------------------------------------------------------------------------------------------------------
