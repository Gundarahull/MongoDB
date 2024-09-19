db.createCollection("rooms", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "room"],
      properties: {
        name: {
          bsonType: "string",
          description: "Please enter a valid name",
        },
        age: {
          bsonType: "number",
          description: "Please enter a valid age",
        },
        room: {
          bsonType: "string",
          description: "Please enter a valid room",
        },
      },
    },
  },
  validationAction: "error",
});

//ORM TYPE:
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a valid name'],
    },
    age: {
        type: Number,
        required: [true, 'Please enter a valid age'],
    },
    room: {
        type: String,
        required: [true, 'Please enter a valid room'],
    }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

//----------------------------------------------------------------------------------------------------------
//For Modifications
db.runCommand({
  collMod: "rooms",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "room", "blocks"],
      properties: {
        name: {
          bsonType: "string",
          description: "Please Enter the VAlid Name",
        },
        age: {
          bsonType: "number",
          description: "Please Enter the Valid Age",
        },
        room: {
          bsonType: "string",
          description: "Please enter the Valid room Number",
        },
        blocks: {
          bsonType: "array",
          description: "Please Enter the Valid Blocks",
          items: {
            bsonType: "object",
            required: ["branch", "blockName"],
            properties: {
              branch: {
                bsonType: "string",
                description: "Please Enter the Valid Branch",
              },
              blockName: {
                bsonType: "string",
                description: "Please Enter the Valid Block Name",
              },
            },
          },
        },
      },
    },
  },
  validationAction: "error",
});
const mongoose = require('mongoose');

// Define the Blocks Schema (Nested Object Schema)
const blockSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: [true, 'Please Enter the Valid Branch'],
    },
    blockName: {
        type: String,
        required: [true, 'Please Enter the Valid Block Name'],
    }
}, { _id: false }); // _id: false prevents automatic creation of _id for subdocuments

// Define the Rooms Schema
const roomSchemA = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter the Valid Name'],
    },
    age: {
        type: Number,
        required: [true, 'Please Enter the Valid Age'],
    },
    room: {
        type: String,
        required: [true, 'Please Enter the Valid room Number'],
    },
    blocks: {
        type: [blockSchema],  // Array of blockSchema
        required: [true, 'Please Enter the Valid Blocks'],
    }
});

const RooM = mongoose.model('Room', roomSchema);

module.exports = Room;
