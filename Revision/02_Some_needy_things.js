//PROJECTION--- what i want to show

db.users.findOne({ name: "Rahul Sharma" }, { age: 1, branch: 1 });
//1 - means have to show,0- means no need to show
ulti > db.users.findOne({ name: "Rahul Sharma" }, { age: 1, branch: 1 });
// {
//   _id: ObjectId('66cd77783b9f145428228fb8'),
//   age: 25,
//   branch: 'Computer Science'
// }

//DATATYPEs
//what are the datatypes can mongoDB hold-
//Number,String,Array,Object,Date,Boolean

//to find what type od dataStructure its
typeof db.users.findOne().age;

//see here in the entercollection
// ulti> typeof db.users.findOne().favoriteMarvelHeroes
// undefined
// ulti> let user = db.users.findOne({name: "Rahul Sharma"});

// ulti> typeof user.age; // Should return 'number'
// number
// ulti> typeof user.address; // Should return 'object'
// object
// ulti> typeof user.favoriteMarvelHeroes; // Should return 'object'
// object

//DROP DATABASE
db.users.drop();

//writeConcern
//we normally use these in WRITE functions.....
//like INSERT and UPDATE
db.users.insertOne(
  { name: "Rahul Sharma", age: 25 },
  {
    writeConcern: { w: 0, j: true, wtimeout: 1000 },
  }
);
// writeConcern is an object that contains w, j, and wtimeout:
// w: 0 means no write acknowledgment is required.                      w--correct inserT or update ayindho ledho kuda guantee lw when we insert 0 1-aithe pakka ayindhi andi
// j: true means the write operation is committed to the journal.       j-true antay okavela db madhyalo server bandh ayina kuda JOUN+RNAL lo store ayyi akkada nunchi vasthundi
// wtimeout: 1000 specifies the timeout in milliseconds (1 second).     wtimeout- intha time lo ayithava ledha ..aithe ne operation chey lekpothe noo....

//ATOMICITY
//aithe andahru lopalaki pondi,
//yemama issue jarigindhi,  andharu baytiki vachi dengandi anthay...
//example
db.users.insertOne(
  { name: "Rahul Sharma", age: 25 },
  {
    writeConcern: { w: 1, j: true },
  }
);
