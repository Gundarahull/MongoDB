//nested Document in the ARRAY

//Nomrally MONGODB is intelligent when we write the fieldname it will detect the what the TYPEof FIELD we are going into insert


learning_db> db.collection.find({"company.companyName":"WebTech"}).count()
[
  {
    _id: ObjectId('66c8302098c259f3ac228fb7'),
    name: 'Darling',
    age: 25,
    company: [
      { companyName: 'WebTech', experienceInMonths: 20 },
      { companyName: 'CodeCraft', experienceInMonths: 14 }
    ]
  },
  {
    _id: ObjectId('66c8304b98c259f3ac228fba'),
    name: 'Darling',
    age: 25,
    company: [
      { companyName: 'WebTech', experienceInMonths: 20 },
      { companyName: 'CodeCraft', experienceInMonths: 14 }
    ]
  }
]
// ---------------------------------------------------------------------------
//Size()

$size()
// returns the size of an array--Length of the ARRAY

db.collection.find({company:{$size:2}})


//------------------------------------------------
//Find the students whos subjects are science and physics

db.students.find({subjects:["Physics","Science"]})  //direct one

//in thse one it will go in left to right flow.... if there is doc with "Svience" and"Phusics" it doesnt show beciase it matching doesnt in the flow

//for these cases are using 
$all
db.students.find({subjects:{$all:["Science","Physics"]}}) //all the elements in

$in 
//ee array lo yem unna mokana dengu
db.students.find({subjects:{$in:["Science","Physics"]}}) //any of the elements

//i want to find the students whose experience gt 24
db.collection.find({ $and: [{ 'company.experienceInMonths':{ $gt: 12 } }]})
//   --------------------------------------------------------------------------------------------------

$elemMatch
// nOw i want in the same field whos name is Amaxon and its experience >12
//we have  elemMatch
db.collection.find({company:{$elemMatch:{companyName:"DevSolutions",experienceInMonths:{$gt:12}}}})

//that means in tha array
//company is a ARRAY
//in that ARRAY with field name and within the same field experience lik ethat
