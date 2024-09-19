//to createDatabase
// use DB_name

//CREATE
db.users.insertOne({ name: "Rahul" });

db.users.insertMany([
    {
        name: "Rahul Sharma",
        age: 25,
        branch: "Computer Science",
        address: {
            countryName: "India",
            stateName: "Maharashtra"
        },
        favoriteMarvelHeroes: ["Iron Man", "Thor", "Spider-Man"]
    },
    {
        name: "Priya Reddy",
        age: 22,
        branch: "Electrical Engineering",
        address: {
            countryName: "India",
            stateName: "Telangana"
        },
        favoriteMarvelHeroes: ["Black Widow", "Captain Marvel", "Hawkeye"]
    },
    {
        name: "Amit Singh",
        age: 28,
        branch: "Mechanical Engineering",
        address: {
            countryName: "India",
            stateName: "Uttar Pradesh"
        },
        favoriteMarvelHeroes: ["Hulk", "Black Panther", "Doctor Strange"]
    },
    {
        name: "Sonal Gupta",
        age: 24,
        branch: "Civil Engineering",
        address: {
            countryName: "India",
            stateName: "Rajasthan"
        },
        favoriteMarvelHeroes: ["Scarlet Witch", "Vision", "Falcon"]
    },
    {
        name: "Anil Kumar",
        age: 26,
        branch: "Information Technology",
        address: {
            countryName: "India",
            stateName: "Karnataka"
        },
        favoriteMarvelHeroes: ["Ant-Man", "Captain America", "War Machine"]
    }
]);


//READ
//syntax
db.users.find({filterOptions})

//find have a cursor in it ..so we can loop thorugh it
db.users.find({}).forEach(element => {
    printjson(element);
});

db.users.find({}) //all
db.users.find({name:"Rahul"})  //specified

db.users.find().count() //how many doc present in the collection
db.users.find().limit(5)  //upto 5 doc

db.uses.findOne({name:"Rahul"})  //only first One

//UPDATE
db.users.updateOne({ filter },{ $set:{ what_need_to_update }})
// example
db.users.updateOne({name:"Rahul"},{$set:{age:23}})

db.users.updateMany({name:"Rahul"},{$set:{age:23}})

//Delete
//Syntax
db.users.deleteOne({ filter })
//example
db.uses.deleteOne({name:"Rahul"})
db.users.deleteMany({name:"Rahul"})


