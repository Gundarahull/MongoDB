The people Collection Documents
Each document represents one person. The key link is that the value in the parent_id field of a child matches the _id of their parent.
_id (Parent ID)	name	parent_id (Points to Parent's _id)	Notes
"4"	Martha	null	The Great-Grandparent (top of the line)
"3"	George	"4"	Child of Martha
"2"	Brenda	"3"	Child of George (Grandparent of Ron)
"1"	Ron	"2"	Child of Brenda (The starting point)
Note: In a real MongoDB setup, these IDs are often ObjectId types, but using strings ("1", "2") makes the example cleaner to read.
Visualizing the Data Flow (The "Join + Join + Join")
When the $graphLookup runs starting from Ron's document, here is how the recursion works:
Step 1: The First "Join" (Finding the Parent)
startWith: "$parent_id" for Ron's document is "2".
MongoDB finds the document where _id is "2".
Result: It finds Brenda's document.
Step 2: The Second "Join" (Finding the Grandparent)
The connectFromField: "parent_id" in Brenda's document is "3".
MongoDB uses "3" to find the next document where _id is "3".
Result: It finds George's document.
Step 3: The Third "Join" (Finding the Great-Grandparent)
The connectFromField: "parent_id" in George's document is "4".
MongoDB uses "4" to find the next document where _id is "4".
Result: It finds Martha's document.
Step 4: End of Recursion
The connectFromField: "parent_id" in Martha's document is null.
The search stops because there is nothing left to match.
All those found documents (Brenda, George, Martha) are then combined into the ancestors array in Ron's final output document.


The Data (Insert this first)
javascript
db.people.insertMany([
  { "_id": "1", "name": "Ron", "parent_id": "2" },
  { "_id": "2", "name": "Brenda", "parent_id": "3" },
  { "_id": "3", "name": "George", "parent_id": "4" },
  { "_id": "4", "name": "Martha", "parent_id": null },
  { "_id": "5", "name": "Sam", "parent_id": "4" }
]);
Use code with caution.

The Query (The final solution)
This query starts at "Ron" and uses $graphLookup to gather all ancestors recursively.
javascript
db.people.aggregate([
  // 1. Start with the "Ron" document
  {
    $match: {
      name: "Ron"
    }
  },

  // 2. The recursive "join + join + join..." stage
  {
    $graphLookup: {
      from: "people",             // Look within the same 'people' collection
      startWith: "$parent_id",    // Start by looking up the ID in Ron's 'parent_id' field
      connectFromField: "parent_id", // In subsequent steps, use the 'parent_id' field of the found document
      connectToField: "_id",      // Match that ID against the '_id' field of documents in 'people'
      as: "ancestors"             // Store the entire lineage here
    }
  },

  // 3. Optional: Clean up the output to just show names
  {
    $project: {
      _id: 0,
      name: 1,
      ancestors: "$ancestors.name"
    }
  }
]);
Use code with caution.

Expected Output:
json
[
  {
    "name": "Ron",
    "ancestors": [
      "Brenda",
      "George",
      "Martha"
    ]
  }
]
Use code with caution.




t
