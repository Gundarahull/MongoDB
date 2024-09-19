test> show dbs
admin         40.00 KiB
config        84.00 KiB
learning_db  112.00 KiB
local         40.00 KiB
test> db.learning_db
test.learning_db
test> show dbs
admin         40.00 KiB
config        84.00 KiB
learning_db  112.00 KiB
local         40.00 KiB
test> use learning_db
switched to db learning_db
learning_db> show collections
marks
students
learning_db> db.morestudent
learning_db.morestudent
learning_db> show collections
marks
students
learning_db> db.teachers.insert({name:"BJASKAR"})
DeprecationWarning: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.
{
  acknowledged: true,
  insertedIds: { '0': ObjectId('66bc56de915863b37d228fb5') }
}
learning_db> show collections
marks
students
teachers
learning_db> db.teachers.insertOne({name:"Venky",age:"35"})
{
  acknowledged: true,
  insertedId: ObjectId('66bc5782915863b37d228fb6')
}
learning_db> db.insertMany({name:"PADGU",age:"35"},{name:"Ramesh",age:"38"})
TypeError: db.insertMany is not a function
learning_db> db.teachers.insertMany({name:"PADGU",age:"35"},{name:"Ramesh",age:"38"})
MongoInvalidArgumentError: Argument "docs" must be an array of documents
learning_db> db.teachers.insertMany([{name:"PADGU",age:"35"},{name:"Ramesh",age:"38"}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('66bc57d6915863b37d228fb7'),
    '1': ObjectId('66bc57d6915863b37d228fb8')
  }
}
learning_db> db.teachers.find()
[
  { _id: ObjectId('66bc56de915863b37d228fb5'), name: 'BJASKAR' },
  {
    _id: ObjectId('66bc5782915863b37d228fb6'),
learning_db>
    age: '35'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb7'),
    name: 'PADGU',
    age: '35'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb8'),
    name: 'Ramesh',
    age: '38'
  }
]
learning_db> db.teachers.updateOne({name:"PADGU"},{$set:{age:"26"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
learning_db> db.teachers.find()
[
  { _id: ObjectId('66bc56de915863b37d228fb5'), name: 'BJASKAR' },
  {
    _id: ObjectId('66bc5782915863b37d228fb6'),
    name: 'Venky',
    age: '35'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb7'),
    name: 'PADGU',
    age: '26'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb8'),
    name: 'Ramesh',
    age: '38'
  }
]
learning_db> db.teachers.updateMany({$gte:{age:"30"}},{$set:{age:"45"}})
MongoServerError: unknown top level operator: $gte. If you have a field name that starts with a '$' symbol, consider using $getField or $setField.
learning_db> db.teachers.updateMany({age:{$gte:30}},{$set:{age:"45"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
learning_db> db.teachers.find()
[
  { _id: ObjectId('66bc56de915863b37d228fb5'), name: 'BJASKAR' },
  {
    _id: ObjectId('66bc5782915863b37d228fb6'),
    name: 'Venky',
    age: '35'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb7'),
    name: 'PADGU',
    age: '26'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb8'),
    name: 'Ramesh',
    age: '38'
  }
]
learning_db> db.teachers.updateMany({age:{$gte:30}},{$set:{age:"45"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
learning_db> db.teachers.updateMany(
...    { age: { $gte: "30" } },
...    { $set: { age: "45" } }
... )
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
learning_db> db.teachers.find()
[
  { _id: ObjectId('66bc56de915863b37d228fb5'), name: 'BJASKAR' },
  {
    _id: ObjectId('66bc5782915863b37d228fb6'),
    name: 'Venky',
    age: '45'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb7'),
    name: 'PADGU',
    age: '26'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb8'),
    name: 'Ramesh',
    age: '45'
  }
]
learning_db> db.teachers.updateMany( { age: { $gte: "45" } }, { $set: { age: "55" } } )
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
learning_db> db.teachers.updateMany({age:{$gte:"55"}},{$set:{age:"78"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
learning_db> db.teachers.find()
[
  { _id: ObjectId('66bc56de915863b37d228fb5'), name: 'BJASKAR' },
  {
    _id: ObjectId('66bc5782915863b37d228fb6'),
    name: 'Venky',
    age: '78'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb7'),
    name: 'PADGU',
    age: '26'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb8'),
    name: 'Ramesh',
    age: '78'
  }
]
learning_db> db.teachers.updateMany( {age:{$gte:78}} ,{$set:{isZpHSSODAM:true}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
learning_db> db.teachers.updateMany( {age:{$gte:"78"}} ,{$set:{isZpHSSODAM:true}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
learning_db> db.teachers.find()
[
  { _id: ObjectId('66bc56de915863b37d228fb5'), name: 'BJASKAR' },
  {
    _id: ObjectId('66bc5782915863b37d228fb6'),
    name: 'Venky',
    age: '78',
    isZpHSSODAM: true
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb7'),
    name: 'PADGU',
    age: '26'
  },
  {
    _id: ObjectId('66bc57d6915863b37d228fb8'),
    name: 'Ramesh',
    age: '78',
    isZpHSSODAM: true
  }
]
learning_db> db.teachers.deleteMany({isZphsSODAM:true})
{ acknowledged: true, deletedCount: 0 }
learning_db> db.teachers.deleteMany({isZpHSSODAM:true})
{ acknowledged: true, deletedCount: 2 }
learning_db> db.teachers.find()
[
  { _id: ObjectId('66bc56de915863b37d228fb5'), name: 'BJASKAR' },
  {
    _id: ObjectId('66bc57d6915863b37d228fb7'),
    name: 'PADGU',
    age: '26'
  }
]
learning_db> db.teachers.deleteOne({name:"PADGU"})
{ acknowledged: true, deletedCount: 1 }
learning_db> db.teachers.find()
[ { _id: ObjectId('66bc56de915863b37d228fb5'), name: 'BJASKAR' } ]
learning_db> db.students.find({})
[
  {
    _id: ObjectId('66bb41df5c43b3f379228fb5'),
    name: 'Rahul',
    age: '23',
    idCard: { aadhar: false, pan: false },
    hobbies: [ 'plating Cricket', 'chilling' ],
    idcard: { aadhar: false }
  },
  {
    _id: ObjectId('66bb42255c43b3f379228fb6'),
    name: 'Gunda',
    age: '53',
    hobbies: [ 'plating Cricket', 'chilling' ]
  },
  { _id: ObjectId('66bb48bb5c43b3f379228fb8'), name: 'Rahul' }
]
learning_db> db.teachers.deleteMany({})
{ acknowledged: true, deletedCount: 1 }
learning_db> db.teachers.find()

learning_db> db.students.find()
[
  {
    _id: ObjectId('66bb41df5c43b3f379228fb5'),
    name: 'Rahul',
    age: '23',
    idCard: { aadhar: false, pan: false },
    hobbies: [ 'plating Cricket', 'chilling' ],
    idcard: { aadhar: false }
  },
  {
    _id: ObjectId('66bb42255c43b3f379228fb6'),
    name: 'Gunda',
    age: '53',
    hobbies: [ 'plating Cricket', 'chilling' ]
  },
  { _id: ObjectId('66bb48bb5c43b3f379228fb8'), name: 'Rahul' }
]
learning_db> db.students.find({},{age:1})
[
  { _id: ObjectId('66bb41df5c43b3f379228fb5'), age: '23' },
  { _id: ObjectId('66bb42255c43b3f379228fb6'), age: '53' },
  { _id: ObjectId('66bb48bb5c43b3f379228fb8') }
]
learning_db> db.students.find({},{age:1,_id:0})
[ { age: '23' }, { age: '53' }, {} ]
learning_db> typeof db.students.find({name})
ReferenceError: name is not defined
learning_db> typeof db.students.find({},{name:1,_id:0})
object
learning_db> typeof db.students.findOne().name
string
learning_db> db.students.insertMany([
...     {
...         name: "Alice",
...         age: 22, // Integer
...         gpa: NumberDecimal("3.75"), // Decimal
...         isActive: true, // Boolean
...         score: 95.5, // Number (Floating point)
...         attendance: Long(120), // Long
...         joinedAt: new Timestamp(), // Timestamp
...         graduationDate: ISODate("2024-05-15T00:00:00Z"), // ISODate
...         subjects: ["Math", "Science", "English"], // Array of strings
...         contact: { // Nested document
...             email: "alice@example.com",
...             phone: "123-456-7890"
...         }
...     },
...     {
...         name: "Bob",
...         age: 23, // Integer
...         gpa: NumberDecimal("3.9"), // Decimal
...         isActive: false, // Boolean
...         score: 88.75, // Number (Floating point)
...         attendance: Long(110), // Long
...         joinedAt: new Timestamp(), // Timestamp
...         graduationDate: ISODate("2024-06-10T00:00:00Z"), // ISODate
...         subjects: ["History", "Geography", "Art"], // Array of strings
...         contact: { // Nested document
...             email: "bob@example.com",
...             phone: "987-654-3210"
...         }
...     },
...     {
...         name: "Charlie",
...         age: 21, // Integer
...         gpa: NumberDecimal("3.65"), // Decimal
...         isActive: true, // Boolean
...         score: 92.0, // Number (Floating point)
...         attendance: Long(130), // Long
...         joinedAt: new Timestamp(), // Timestamp
...         graduationDate: ISODate("2024-07-20T00:00:00Z"), // ISODate
...         subjects: ["Physics", "Chemistry", "Biology"], // Array of strings
...         contact: { // Nested document
...             email: "charlie@example.com",
...             phone: "555-444-3333"
...         }
...     }
... ])

{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('66bc65b4915863b37d228fb9'),
    '1': ObjectId('66bc65b4915863b37d228fba'),
    '2': ObjectId('66bc65b4915863b37d228fbb')
  }
}
learning_db> typeof db.students.findOne().name
string
learning_db> typeof db.students.find()
object
learning_db> db.students.find()
[
  {
    _id: ObjectId('66bb41df5c43b3f379228fb5'),
    name: 'Rahul',
    age: '23',
    idCard: { aadhar: false, pan: false },
    hobbies: [ 'plating Cricket', 'chilling' ],
    idcard: { aadhar: false }
  },
  {
    _id: ObjectId('66bb42255c43b3f379228fb6'),
    name: 'Gunda',
    age: '53',
    hobbies: [ 'plating Cricket', 'chilling' ]
  },
  { _id: ObjectId('66bb48bb5c43b3f379228fb8'), name: 'Rahul' },
  {
    _id: ObjectId('66bc65b4915863b37d228fb9'),
    name: 'Alice',
    age: 22,
    gpa: Decimal128('3.75'),
    isActive: true,
    score: 95.5,
    attendance: Long('120'),
    joinedAt: Timestamp({ t: 1723622836, i: 1 }),
    graduationDate: ISODate('2024-05-15T00:00:00.000Z'),
    subjects: [ 'Math', 'Science', 'English' ],
    contact: { email: 'alice@example.com', phone: '123-456-7890' }
  },
  {
    _id: ObjectId('66bc65b4915863b37d228fba'),
    name: 'Bob',
    age: 23,
    gpa: Decimal128('3.9'),
    isActive: false,
    score: 88.75,
    attendance: Long('110'),
    joinedAt: Timestamp({ t: 1723622836, i: 2 }),
    graduationDate: ISODate('2024-06-10T00:00:00.000Z'),
    subjects: [ 'History', 'Geography', 'Art' ],
    contact: { email: 'bob@example.com', phone: '987-654-3210' }
  },
  {
    _id: ObjectId('66bc65b4915863b37d228fbb'),
    name: 'Charlie',
    age: 21,
    gpa: Decimal128('3.65'),
    isActive: true,
    score: 92,
    attendance: Long('130'),
    joinedAt: Timestamp({ t: 1723622836, i: 3 }),
    graduationDate: ISODate('2024-07-20T00:00:00.000Z'),
    subjects: [ 'Physics', 'Chemistry', 'Biology' ],
    contact: { email: 'charlie@example.com', phone: '555-444-3333' }
  }
]
learning_db> show dbs
admin         40.00 KiB
config       108.00 KiB
learning_db  160.00 KiB
local         40.00 KiB
learning_db> show databases
admin         40.00 KiB
config       108.00 KiB
learning_db  160.00 KiB
local         40.00 KiB
learning_db> use chumma
switched to db chumma
chumma> show databases
admin         40.00 KiB
config       108.00 KiB
learning_db  160.00 KiB
local         40.00 KiB
chumma> db.heheeh.inserOne({name:"233"})
TypeError: db.heheeh.inserOne is not a function
chumma> db.heheeh.insertOne({name:"233"})
{
  acknowledged: true,
  insertedId: ObjectId('66bc6795915863b37d228fbc')
}
chumma> db.heheeh.insertOne({name:"678"})
{
  acknowledged: true,
  insertedId: ObjectId('66bc679c915863b37d228fbd')
}
chumma> show collections
heheeh
chumma> db.heheeh.drop()
true
chumma> show collections

chumma> db.dropDatabase()
{ ok: 1, dropped: 'chumma' }
chumma> show databases
admin         40.00 KiB
config       108.00 KiB
learning_db  160.00 KiB
local         40.00 KiB
chumma> use learning_db
switched to db learning_db
learning_db> show collections
marks
students
teachers
learning_db> db.students.find()
[
  {
    _id: ObjectId('66bb41df5c43b3f379228fb5'),
    name: 'Rahul',
    age: '23',
    idCard: { aadhar: false, pan: false },
    hobbies: [ 'plating Cricket', 'chilling' ],
    idcard: { aadhar: false }
  },
  {
    _id: ObjectId('66bb42255c43b3f379228fb6'),
    name: 'Gunda',
    age: '53',
    hobbies: [ 'plating Cricket', 'chilling' ]
  },
  { _id: ObjectId('66bb48bb5c43b3f379228fb8'), name: 'Rahul' },
  {
    _id: ObjectId('66bc65b4915863b37d228fb9'),
    name: 'Alice',
    age: 22,
    gpa: Decimal128('3.75'),
    isActive: true,
    score: 95.5,
    attendance: Long('120'),
    joinedAt: Timestamp({ t: 1723622836, i: 1 }),
    graduationDate: ISODate('2024-05-15T00:00:00.000Z'),
    subjects: [ 'Math', 'Science', 'English' ],
    contact: { email: 'alice@example.com', phone: '123-456-7890' }
  },
  {
    _id: ObjectId('66bc65b4915863b37d228fba'),
    name: 'Bob',
    age: 23,
    gpa: Decimal128('3.9'),
    isActive: false,
    score: 88.75,
    attendance: Long('110'),
    joinedAt: Timestamp({ t: 1723622836, i: 2 }),
    graduationDate: ISODate('2024-06-10T00:00:00.000Z'),
    subjects: [ 'History', 'Geography', 'Art' ],
    contact: { email: 'bob@example.com', phone: '987-654-3210' }
  },
  {
    _id: ObjectId('66bc65b4915863b37d228fbb'),
    name: 'Charlie',
    age: 21,
    gpa: Decimal128('3.65'),
    isActive: true,
    score: 92,
    attendance: Long('130'),
    joinedAt: Timestamp({ t: 1723622836, i: 3 }),
    graduationDate: ISODate('2024-07-20T00:00:00.000Z'),
    subjects: [ 'Physics', 'Chemistry', 'Biology' ],
    contact: { email: 'charlie@example.com', phone: '555-444-3333' }
  }
]
learning_db> db.createCollection('rooms',{
...     validator:{
...         $jsonSchema:{
...             required:['name','age','room'],
...             properties:{
...                 name:{
...                     bsonType:'string',
...                     description:'Please enter a valid name',
...                 },
...                 age:{
...                     bsonType:'number',
...                     description:'Please enter a valid age',
...                 },
...                 room:{
...                     bsonType:'string',
...                     description:'Please enter a valid room',
...                 }
...             }
...         }
...     },
...     validateActions:"error"
... })
MongoServerError[Location40415]: BSON field 'create.validateActions' is an unknown field.
learning_db> db.createCollection('rooms', {
...     validator: {
...         $jsonSchema: {
...             bsonType: "object",
...             required: ['name', 'age', 'room'],
...             properties: {
...                 name: {
...                     bsonType: 'string',
...                     description: 'Please enter a valid name',
...                 },
...                 age: {
...                     bsonType: 'number',
...                     description: 'Please enter a valid age',
...                 },
...                 room: {
...                     bsonType: 'string',
...                     description: 'Please enter a valid room',
...                 }
...             }
...         }
...     },
...     validationAction: "error"
... })
{ ok: 1 }
learning_db> db.rooms.insertOne({name:"rahul",age:"23"})
Uncaught:
MongoServerError: Document failed validation
Additional information: {
  failingDocumentId: ObjectId('66bc9019915863b37d228fbe'),
  details: {
    operatorName: '$jsonSchema',
    schemaRulesNotSatisfied: [
      {
        operatorName: 'properties',
        propertiesNotSatisfied: [
          {
            propertyName: 'age',
            description: 'Please enter a valid age',
            details: [
              {
                operatorName: 'bsonType',
                specifiedAs: { bsonType: 'number' },
                reason: 'type did not match',
                consideredValue: '23',
                consideredType: 'string'
              }
            ]
          }
        ]
      },
      {
        operatorName: 'required',
        specifiedAs: { required: [ 'name', 'age', 'room' ] },
        missingProperties: [ 'room' ]
      }
    ]
  }
}
learning_db> db.rooms.insertOne({name:"rahul",age:23,room:"F50"})
{
  acknowledged: true,
  insertedId: ObjectId('66bc9035915863b37d228fbf')
}
learning_db> db.rooms.find()
[
  {
    _id: ObjectId('66bc9035915863b37d228fbf'),
    name: 'rahul',
    age: 23,
    room: 'F50'
  }
]
learning_db> db.runCommand({
...   collMod: "rooms",
...   validator: {
...     $jsonSchema: {
...       bsonType: "object",
...       required: ["name", "age", "room", "blocks"],
...       properties: {
...         name: {
...           bsonType: "string",
...           description: "Please Enter the VAlid Name",
...         },
...         age: {
...           bsonType: "number",
...           description: "Please Enter the Valid Age",
...         },
...         room: {
...           bsonType: "string",
...           description: "Please enter the Valid room Number",
...         },
...         blocks: {
...           bsonType: "array",
...           description: "Please Enter the Valid Blocks",
...           items: {
...             bsonType: "object",
...             required: ["branch", "blockName"],
...             properties: {
...               branch: {
...                 bsonType: "string",
...                 description: "Please Enter the Valid Branch",
...               },
...               blockName: {
...                 bsonType: "string",
...                 description: "Please Enter the Valid Block Name",
...               },
...             },
...           },
...         },
...       },
...     },
...   },
...   validationAction: "error",
... });
{ ok: 1 }
learning_db>
db.rooms.insertOne({
...   name: "John Doe",
...   age: 28,
...   room: "Room 101",
...   blocks: [
...     {
...       branch: "North Wing",
...       blockName: "Block A"
...     },
...     {
...       branch: "South Wing",
...       blockName: "Block B"
...     }
...   ]
... })
{
  acknowledged: true,
  insertedId: ObjectId('66bc9362915863b37d228fc0')
}
learning_db> db.rooms.find()
[
  {
    _id: ObjectId('66bc9035915863b37d228fbf'),
    name: 'rahul',
    age: 23,
    room: 'F50'
  },
  {
    _id: ObjectId('66bc9362915863b37d228fc0'),
    name: 'John Doe',
    age: 28,
    room: 'Room 101',
    blocks: [
      { branch: 'North Wing', blockName: 'Block A' },
      { branch: 'South Wing', blockName: 'Block B' }
    ]
  }
]
learning_db> db.createCollection('people');
{ ok: 1 }
learning_db> db.people.insertMany([
...   { name: "John Doe", age: 28 },
...   { name: "Jane Smith", age: 34 },
...   { name: "Alice Johnson", age: 22 },
...   { name: "Bob Brown", age: 45 },
...   { name: "Charlie Davis", age: 30 },
...   { name: "Emily Wilson", age: 27 },
...   { name: "Frank Thomas", age: 50 },
...   { name: "Grace Lee", age: 40 }
... ]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('66bc9d37915863b37d228fc1'),
    '1': ObjectId('66bc9d37915863b37d228fc2'),
    '2': ObjectId('66bc9d37915863b37d228fc3'),
    '3': ObjectId('66bc9d37915863b37d228fc4'),
    '4': ObjectId('66bc9d37915863b37d228fc5'),
    '5': ObjectId('66bc9d37915863b37d228fc6'),
    '6': ObjectId('66bc9d37915863b37d228fc7'),
    '7': ObjectId('66bc9d37915863b37d228fc8')
  }
}
learning_db> db.people.find()
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc1'),
    name: 'John Doe',
    age: 28
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc2'),
    name: 'Jane Smith',
    age: 34
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc3'),
    name: 'Alice Johnson',
    age: 22
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc4'),
    name: 'Bob Brown',
    age: 45
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc5'),
    name: 'Charlie Davis',
    age: 30
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc6'),
    name: 'Emily Wilson',
    age: 27
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc7'),
    name: 'Frank Thomas',
    age: 50
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc8'),
    name: 'Grace Lee',
    age: 40
  }
]
learning_db> db.people({age:40})
TypeError: db.people is not a function
learning_db> db.people.find({age:40})
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc8'),
    name: 'Grace Lee',
    age: 40
  }
]
learning_db> db.people.find({age:{$ne:40}})
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc1'),
    name: 'John Doe',
    age: 28
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc2'),
    name: 'Jane Smith',
    age: 34
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc3'),
    name: 'Alice Johnson',
    age: 22
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc4'),
    name: 'Bob Brown',
    age: 45
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc5'),
    name: 'Charlie Davis',
    age: 30
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc6'),
    name: 'Emily Wilson',
    age: 27
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc7'),
    name: 'Frank Thomas',
    age: 50
  }
]
learning_db> db.people.find(age:{$gte:40})
Uncaught:
SyntaxError: Unexpected token, expected "," (1:18)

> 1 | db.people.find(age:{$gte:40})
    |                   ^
  2 |

learning_db> db.people.find({age:{$gte:40}})
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc4'),
    name: 'Bob Brown',
    age: 45
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc7'),
    name: 'Frank Thomas',
    age: 50
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc8'),
    name: 'Grace Lee',
    age: 40
  }
]
learning_db> db.people.find({age:{in:[25,50]}})

learning_db> db.people.find({age:{$in:[25,50]}})
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc7'),
    name: 'Frank Thomas',
    age: 50
  }
]
learning_db> db.people.find({age:{$in:[27,50]}})
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc6'),
    name: 'Emily Wilson',
    age: 27
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc7'),
    name: 'Frank Thomas',
    age: 50
  }
]
learning_db> db.people.find({ $and:[{age:{$gte:27}},{age:{$lte:50}}])
Uncaught:
SyntaxError: Unexpected token, expected "," (1:55)

> 1 | db.people.find({ $and:[{age:{$gte:27}},{age:{$lte:50}}])
    |                                                        ^
  2 |

learning_db> db.people.find({ $and: [{ age: { $gte: 27 } }, { age: { $lte: 50 } }] })
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc1'),
    name: 'John Doe',
    age: 28
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc2'),
    name: 'Jane Smith',
    age: 34
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc4'),
    name: 'Bob Brown',
    age: 45
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc5'),
    name: 'Charlie Davis',
    age: 30
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc6'),
    name: 'Emily Wilson',
    age: 27
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc7'),
    name: 'Frank Thomas',
    age: 50
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc8'),
    name: 'Grace Lee',
    age: 40
  }
]
learning_db> learning_db> db.people.find({ $or: [{ age: { $gte: 27 } }, { age: { $lte: 50 } }] })
ReferenceError: learning_db is not defined
learning_db>  db.people.find({ $or: [{ age: { $gte: 27 } }, { age: { $lte: 50 } }] })
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc1'),
    name: 'John Doe',
    age: 28
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc2'),
    name: 'Jane Smith',
    age: 34
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc3'),
    name: 'Alice Johnson',
    age: 22
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc4'),
    name: 'Bob Brown',
    age: 45
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc5'),
    name: 'Charlie Davis',
    age: 30
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc6'),
    name: 'Emily Wilson',
    age: 27
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc7'),
    name: 'Frank Thomas',
    age: 50
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc8'),
    name: 'Grace Lee',
    age: 40
  }
]
learning_db> db.people.find({ $or: [{ age: { $gte: 27 } }, { age: { $lte: 50 } }] })
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc1'),
    name: 'John Doe',
    age: 28
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc2'),
    name: 'Jane Smith',
    age: 34
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc3'),
    name: 'Alice Johnson',
    age: 22
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc4'),
    name: 'Bob Brown',
    age: 45
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc5'),
    name: 'Charlie Davis',
    age: 30
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc6'),
    name: 'Emily Wilson',
    age: 27
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc7'),
    name: 'Frank Thomas',
    age: 50
  },
  {
    _id: ObjectId('66bc9d37915863b37d228fc8'),
    name: 'Grace Lee',
    age: 40
  }
]
learning_db> db.people.find({ $nor: [{ age: { $gte: 27 } }, { age: { $lte: 50 } }] })

learning_db> db.people.find({ $nor: [{ age: { $gte: 27 } }, { age: { $lte:30 } }] })

learning_db> db.people.find({ $nor: [{ age: { $gte: 27 } }] })
[
  {
    _id: ObjectId('66bc9d37915863b37d228fc3'),
    name: 'Alice Johnson',
    age: 22
  }
]
learning_db>
















